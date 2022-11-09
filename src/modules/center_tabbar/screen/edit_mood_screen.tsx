import {NavigationProp, ParamListBase} from '@react-navigation/native';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import BaseHeader from '../../../shared/ui/containers/base_header';
import AppStyle from '../../../shared/ui/styles/app.style';
import {
  IC_BACK,
  IC_DELETE,
  IC_DOWN,
  IC_DOWN_ARROW_NORMAL,
  IC_SCREEN_EMPTY_NORMAL,
} from '../../../utils/icons';
import CalendarStore from '../../calendar/store/calendar_store';
import styles from './styles';
import Onboarding from 'react-native-onboarding-swiper';
import PageActivities from '../component/page_activities';
import {observer} from 'mobx-react';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';
import Lightbox from 'react-native-lightbox-v2';
import ActionSheet from 'react-native-actionsheet';
import i18n from '../../../utils/i18n';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';

interface EditMoodScreenProps {
  route: any;
  navigation: NavigationProp<ParamListBase>;
  calendarStore: CalendarStore;
  moodStore: MoodStore;
  uiStore: UIStore;
}

const EditMoodScreen = observer(
  ({
    route,
    navigation,
    calendarStore,
    moodStore,
    uiStore,
  }: EditMoodScreenProps) => {
    let actionSheet = useRef<any>();
    let optionDelete = ['Cancel', 'Delete'];
    const [height, setHeight] = useState(0);
    const checkActiviti = () => {
      if (route.params?.mood?.activitiesObj.length > 0) {
        let count = Math.ceil(route.params.mood.activitiesObj.length / 10);
        switch (count) {
          case 1:
            return [renderPage(0, 10)];
          case 2:
            return [renderPage(0, 10), renderPage(10, 20)];
          case 3:
            return [renderPage(0, 10), renderPage(10, 20), renderPage(20, 30)];
          case 4:
            return [
              renderPage(0, 10),
              renderPage(10, 20),
              renderPage(20, 30),
              renderPage(30, 40),
            ];
          case 5:
            return [
              renderPage(0, 10),
              renderPage(10, 20),
              renderPage(20, 30),
              renderPage(30, 40),
              renderPage(40, 49),
            ];
          default:
            break;
        }
      }
    };

    const renderPage = (start: number, end: number) => {
      return {
        backgroundColor: 'transparent',
        image: (
          <PageActivities
            uiStore={uiStore}
            mood={route.params.mood}
            isEdit={route.params.mood?.activitiesObj ? true : false}
            moodStore={moodStore}
            data={route.params.mood?.activitiesObj.slice(start, end)}
          />
        ),
        title: '',
        subtitle: '',
      };
    };

    const onBack = () => {
      const arrMods = moodStore.getMoodsFollowDate(
        route.params?.mood?.createTimeMood,
      );
      moodStore.setArrMoodDay(arrMods);
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
      navigation.goBack();
    };

    const onRemove = () => {
      actionSheet.current.show();
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            uiStore.bgMode == 'dark'
              ? moodStore.getColorFollowType(route.params.mood.moodType)
              : moodStore.getBgLightColorFollowType(route.params.mood.moodType),
        }}>
        <BaseHeader
          containerStyle={{height: AppStyle.Screen.FullHeight / 8}}
          rightElement={<Image style={styles.rightIcon} source={IC_DELETE} />}
          rightAction={onRemove}
          centerElement={
            <Image
              style={styles.centerIcon}
              source={moodStore.getImageFollowType(route.params.mood.moodType)}
            />
          }
          leftAction={onBack}
          leftElement={<Image style={styles.leftIcon} source={IC_BACK} />}
        />
        <ScrollView
          style={{flexGrow: 1}}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View>
            <View pointerEvents="none" style={styles.containerDatepicker}>
              <TouchableOpacity style={styles.boxDate}>
                <Text style={styles.txtDate}>
                  {moment(route.params.mood.createTime).format(
                    'HH:mm' + ', ' + 'Do MMMM YYYY',
                  )}
                </Text>
              </TouchableOpacity>
              <DatePicker
                locale={'en_GB'}
                modal
                date={new Date(route.params.mood.createTime)}
              />
            </View>
            {route.params.mood?.activitiesObj ? (
              route.params.mood.activitiesObj.length > 0 && (
                <View pointerEvents="none" style={styles.viewActivity}>
                  <Onboarding
                    showDone={false}
                    showNext={false}
                    showSkip={false}
                    bottomBarHeight={AppStyle.Screen.FullHeight / 24}
                    bottomBarColor={
                      uiStore.bgMode == 'dark'
                        ? moodStore.getColorFollowType(
                            route.params.mood.moodType,
                          )
                        : moodStore.getBgLightColorFollowType(
                            route.params.mood.moodType,
                          )
                    }
                    pages={checkActiviti()}
                  />
                </View>
              )
            ) : (
              <View style={styles.containerImg}>
                <Image
                  style={styles.imgDream}
                  source={IC_SCREEN_EMPTY_NORMAL}
                />
                <Image
                  style={styles.imgDownload}
                  source={IC_DOWN_ARROW_NORMAL}
                />
              </View>
            )}
            {route.params?.mood?.description && (
              <View
                pointerEvents="none"
                style={[
                  styles.containerInput,
                  {
                    backgroundColor:
                      uiStore.bgMode == 'dark'
                        ? AppStyle.BGColor.Dark
                        : AppStyle.BGColor.White,
                    height: Math.max(35, height) + 20,
                  },
                ]}>
                <TextInput
                  textAlignVertical={'center'}
                  multiline={true}
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
                  defaultValue={route.params.mood.description}
                />
              </View>
            )}

            <ScrollView
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              horizontal={true}
              style={styles.listImage}>
              {route.params?.mood?.image
                ? route.params?.mood?.image.map((e, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row-reverse',
                          height: AppStyle.Screen.FullHeight / 5.5,
                          width: AppStyle.Screen.FullWidth / 4.5,
                          marginHorizontal: 12,
                          borderRadius: 8,
                        }}>
                        <Lightbox
                          renderContent={() => (
                            <View
                              style={{
                                width: AppStyle.Screen.FullWidth,
                                height: AppStyle.Screen.FullHeight,
                              }}>
                              <FastImage
                                resizeMode="contain"
                                style={{flex: 1}}
                                source={{uri: e}}
                              />
                            </View>
                          )}>
                          <FastImage source={{uri: e}} style={styles.image} />
                        </Lightbox>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddMoodDetail', {
              mood: route.params.mood,
              isEdit: true,
            });
          }}
          style={[
            styles.btnEdit,
            {
              backgroundColor:
                uiStore.bgMode == 'dark'
                  ? AppStyle.BGColor.BlueSky
                  : AppStyle.BgMood.Rad,
            },
          ]}>
          <Text style={styles.txtEdit}>{i18n.t('edit')}</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={actionSheet}
          options={optionDelete}
          destructiveButtonIndex={1}
          cancelButtonIndex={0}
          onPress={index => {
            if (index == 1) {
              firestore()
                .collection(`${moodStore.idDevice}`)
                .doc(`${route.params.mood.id}`)
                .delete()
                .then(() => {
                  console.log('User deleted!');
                });
              // moodStore.removeMood(route.params.mood.id);
              const arrMods = moodStore.getMoodsFollowDate(
                route.params?.mood?.createTimeMood,
              );
              moodStore.setArrMoodDay(arrMods);
              navigation.goBack();
            }
          }}
        />
      </View>
    );
  },
);

export default EditMoodScreen;
