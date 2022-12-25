import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {reaction} from 'mobx';
import {observer} from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import {useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Lightbox from 'react-native-lightbox-v2';
import Onboarding from 'react-native-onboarding-swiper';
import ArrActivitiesEn from '../../../assets/json/en/activities.json';
import ArrActivitiesVi from '../../../assets/json/vi/activities.json';
import ArrMoods from '../../../assets/json/en/moods.json';
import MoodStore, {SAVE_MOODS} from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import BaseHeader from '../../../shared/ui/containers/base_header';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';
import ListMood from '../../../shared/ui/containers/list_moods/main';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {
  IC_ADD,
  IC_BACK,
  IC_DELETE_IMAGE,
  IC_DOWN,
  IC_TICK_DONE,
} from '../../../utils/icons';
import CalendarStore from '../../calendar/store/calendar_store';
import PageActivities from '../component/page_activities';
import styles from './styles';
import {saveObjectDataLocal} from '../../../services/storage';
import firestore from '@react-native-firebase/firestore';
import AddIcon from '../../../shared/ui/containers/add_icon';

interface AddMoodDetailProps {
  calendarStore: CalendarStore;
  uiStore: UIStore;
  moodStore: MoodStore;
  rootNavigation: NavigationProp<ParamListBase>;
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const AddMoodDetail = observer(
  ({
    uiStore,
    calendarStore,
    moodStore,
    rootNavigation,
    route,
    navigation,
  }: AddMoodDetailProps) => {
    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );
    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);

    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState<boolean>(false);
    const [text, setText] = React.useState<string>(
      route.params?.mood?.description ? route.params.mood.description : '',
    );
    const [height, setHeight] = React.useState(0);

    const getArrActivitiesFollowMood = (type: string) => {
      moodStore.arrActivitiesFollowMood.push({
        id: 1,
        type: 'AddActivity',
        name: i18n.t('add_new'),
        image: IC_ADD,
      });
      ArrMoods.forEach(e => {
        if (e.moodType == type) {
          (i18n.language === 'en' ? ArrActivitiesEn : ArrActivitiesVi).forEach(
            a => {
              e.activities.forEach(element => {
                if (element == a.id) {
                  moodStore.arrActivitiesFollowMood.push(a);
                }
              });
            },
          );
        }
      });
    };

    const getArrActivitiesFree = () => {
      return (
        i18n.language === 'en' ? ArrActivitiesEn : ArrActivitiesVi
      ).filter(e => e.id < 1000);
    };

    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        width: AppStyle.Screen.FullWidth,
        height: AppStyle.Screen.FullHeight,
        multiple: true,
        smartAlbums: [
          'PhotoStream',
          'Generic',
          'Panoramas',
          'Videos',
          'Favorites',
          'Timelapses',
          'AllHidden',
          'RecentlyAdded',
          'Bursts',
          'SlomoVideos',
          'UserLibrary',
          'SelfPortraits',
          'Screenshots',
          'DepthEffect',
          'LivePhotos',
          'Animated',
          'LongExposure',
        ],
      }).then(image => {
        image.forEach(e => {
          moodStore.addImage(e.path);
        });
      });
    };
    React.useEffect(() => {
      if (route.params.isEdit) {
        if (route.params?.mood?.image?.length > 0) {
          moodStore.addArrImage(route.params.mood.image);
        }
        if (route.params?.mood?.activitiesObj?.length > 0) {
          moodStore.addArrActivities(route.params.mood.activitiesObj);
        }
        setDate(new Date(route.params.mood.createTime));
        let idx = moodStore.getIdFollowType(route.params?.mood?.moodType);
        moodStore.selectMood(idx! + 1);
      } else {
        // moodStore.getArrActivitiesFollowMood(route.params.moodType);
        getArrActivitiesFollowMood(route.params.moodType);
      }
    }, [route.params.moodType]);

    const renderPage = (start: number, end: number) => {
      return {
        backgroundColor: 'transparent',
        image: (
          <PageActivities
            uiStore={uiStore}
            moodStore={moodStore}
            data={moodStore.arrActivitiesFollowMood.slice(start, end)}
          />
        ),
        title: '',
        subtitle: '',
      };
    };

    const renderPageAll = (start: number, end: number) => {
      return {
        backgroundColor: 'transparent',
        image: (
          <PageActivities
            uiStore={uiStore}
            mood={route.params?.mood}
            isEdit={route.params?.isEdit}
            moodStore={moodStore}
            // data={moodStore.getArrActivitiesFree().slice(start, end)}
            data={getArrActivitiesFree().slice(start, end)}
          />
        ),
        title: '',
        subtitle: '',
      };
    };

    const onSave = () => {
      if (route.params?.isEdit) {
        moodStore.arrMoods.forEach((e, idx) => {
          if (e.id == route.params?.mood.id) {
            firestore()
              .collection(`${moodStore.idDevice}`)
              .doc(`${route.params?.mood.id}`)
              .update({
                ...e,
                id: e.id,
                activitiesObj: [...moodStore.arrActivitiesObject],
                image: [...moodStore.arrImage],
                inputName: moodStore.getNameFollowId(moodStore.isSelect - 1),
                moodType: moodStore.getTypeFollowId(moodStore.isSelect - 1),
                description: text.length > 0 && text,
                createTime: new Date(date).getTime(),
              })
              .then(() => {
                console.log('User updated!');
              });
            moodStore.resetArrImg();
            navigation.navigate('EditMoodScreen', {
              mood: moodStore.curMood,
            });
          }
        });
      } else {
        let time = new Date().getTime();
        firestore()
          .collection(`${moodStore.idDevice}`)
          .doc(`${time}`)
          .set({
            id: time,
            inputName: moodStore.getNameFollowType(route.params.moodType),
            moodType: route.params.moodType,
            image: [...moodStore.arrImage],
            description: text.length > 0 && text,
            activitiesObj: [...moodStore.arrActivitiesObject],
            createTime: route.params.createTimeMood,
          })
          .then(() => {
            console.log('Mood added!');
          });
        const arrMods = moodStore.getMoodsFollowDate(
          route.params.createTimeMood,
        );
        moodStore.setArrMoodDay(arrMods);
        moodStore
          .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
          .forEach(mood => {
            moodStore.getArrMoodFollowMonth(mood);
          });
        moodStore.resetArrImg();
        navigation.navigate('Calendar');
      }
      saveObjectDataLocal(SAVE_MOODS, moodStore.arrMoods);
      moodStore.resetActiviti();
      moodStore.arrActivitiesFollowMood.splice(0);
    };

    const onBack = () => {
      navigation.goBack();
      moodStore.resetActiviti();
      moodStore.resetArrImg();
      moodStore.arrActivitiesFollowMood.splice(0);
    };
    return (
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor:
            uiStore.bgMode === 'dark'
              ? moodStore.getColorFollowType(
                  route.params?.mood
                    ? moodStore.getTypeFollowId(moodStore.isSelect - 1)
                    : route.params.moodType,
                )
              : moodStore.getBgLightColorFollowType(
                  route.params?.mood
                    ? moodStore.getTypeFollowId(moodStore.isSelect - 1)
                    : route.params.moodType,
                ),
        }}>
        <BaseHeader
          containerStyle={{height: AppStyle.Screen.FullHeight / 8}}
          rightElement={
            <Image style={styles.rightIcon} source={IC_TICK_DONE} />
          }
          rightAction={onSave}
          centerElement={
            <Image
              style={styles.centerIcon}
              source={moodStore.getImageFollowType(
                route.params?.mood
                  ? moodStore.getTypeFollowId(moodStore.isSelect - 1)
                  : route.params.moodType,
              )}
            />
          }
          leftAction={onBack}
          leftElement={<Image style={styles.leftIcon} source={IC_BACK} />}
        />
        <ScrollView>
          <View>
            {route.params?.isEdit ? null : (
              <Text style={styles.txtDoing}>
                {i18n.t('calendar.what_have_you_been_up_to')}
              </Text>
            )}
            {route.params?.isEdit ? (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.boxDate}
                  onPress={() => setOpen(true)}>
                  <Text style={styles.txtDate}>
                    {moment(date).format('HH:mm' + ', ' + 'Do MMMM YYYY')}
                  </Text>
                  <Image style={styles.icDown} source={IC_DOWN} />
                </TouchableOpacity>
                <DatePicker
                  locale={'en_GB'}
                  modal
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <View style={styles.listMood}>
                  <ListMood moodStore={moodStore} />
                </View>
              </View>
            ) : undefined}
            <View style={styles.viewActivity}>
              <Onboarding
                showDone={false}
                showNext={false}
                showSkip={false}
                bottomBarHeight={AppStyle.Screen.FullHeight / 24}
                bottomBarColor={
                  uiStore.bgMode === 'dark'
                    ? moodStore.getColorFollowType(
                        route.params?.mood
                          ? moodStore.getTypeFollowId(moodStore.isSelect - 1)
                          : route.params.moodType,
                      )
                    : moodStore.getBgLightColorFollowType(
                        route.params?.mood
                          ? moodStore.getTypeFollowId(moodStore.isSelect - 1)
                          : route.params.moodType,
                      )
                }
                pages={
                  route.params?.isEdit
                    ? [
                        renderPageAll(0, 10),
                        renderPageAll(10, 20),
                        renderPageAll(20, 30),
                        renderPageAll(30, 40),
                        renderPageAll(40, 49),
                      ]
                    : [
                        renderPage(0, 10),
                        renderPage(10, 20),
                        renderPage(20, 22),
                      ]
                }
              />
            </View>
            <View style={{paddingHorizontal: 16, marginBottom: 8}}>
              <Text style={styles.txtDoing}>Chi tiêu</Text>
            </View>
            <View
              style={[
                styles.containerInput,
                {
                  backgroundColor:
                    uiStore.bgMode == 'dark'
                      ? AppStyle.BGColor.GrayDark
                      : AppStyle.BGColor.White,
                  height: Math.max(35, height) + 20,
                },
              ]}>
              <TextInput
                textAlignVertical={'center'}
                multiline={true}
                onChangeText={text => {
                  setText(text);
                }}
                onContentSizeChange={event => {
                  setHeight(event.nativeEvent.contentSize.height);
                }}
                style={[
                  styles.input,
                  {
                    color:
                      uiStore.bgMode == 'dark'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.Black,
                    height: Math.max(35, height) + 10,
                  },
                ]}
                defaultValue={text}
                placeholder={i18n.t('Số tiền')}
                placeholderTextColor={
                  uiStore.bgMode == 'dark'
                    ? AppStyle.MoreColors.ThumbDeactived
                    : AppStyle.BGColor.Gray
                }
              />
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={[styles.listImage]}>
              <TouchableOpacity
                onPress={() => {
                  choosePhotoFromLibrary();
                  // setOpenModal(true);
                }}
                style={styles.btnAddImage}>
                <Image style={styles.addIcon} source={IC_ADD} />
                <Text style={styles.txtAddImage}>{i18n.t('add_image')}</Text>
              </TouchableOpacity>
              {moodStore.arrImage.length > 0 &&
                moodStore.arrImage.map((e, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row-reverse',
                        height: AppStyle.Screen.FullHeight / 5.5,
                        width: AppStyle.Screen.FullWidth / 4.5,
                        borderRadius: 8,
                        marginHorizontal: 6,
                      }}>
                      <Lightbox
                        springConfig={{overshootClamping: true}}
                        renderContent={() => (
                          <FastImage
                            resizeMode={'contain'}
                            style={{
                              flex: 1,
                              width: AppStyle.Screen.FullWidth,
                              height: AppStyle.Screen.FullHeight,
                            }}
                            source={{uri: e}}
                          />
                        )}>
                        <FastImage source={{uri: e}} style={styles.image} />
                      </Lightbox>
                      <TouchableOpacity
                        onPress={() => {
                          moodStore.arrImage.splice(index, 1);
                        }}
                        style={styles.btnDelete}>
                        <Image
                          style={styles.imgDelete}
                          source={IC_DELETE_IMAGE}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </ScrollView>
            {/* {
              <ModalAddImage
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            } */}
            <AddIcon moodStore={moodStore} uiStore={uiStore} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  },
);

export default AddMoodDetail;
