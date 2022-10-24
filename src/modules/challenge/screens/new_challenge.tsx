import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {observer} from 'mobx-react';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ArrActivities from '../../../assets/json/en/activities.json';
import UIStore from '../../../shared/store/ui';
import {ActivityType} from '../../../shared/type/activiti';
import BaseHeader from '../../../shared/ui/containers/base_header';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import styles from '../component/styles';
import {
  ic_arrow_left_orange,
  IC_ARROW_RIGHT,
  ic_a_walk_per_day,
  ic_be_an_artist,
  ic_breakfast,
  ic_breath_slowly,
  ic_brush_teeth,
  ic_check_my_health,
  ic_commit_my_plan,
  IC_DATE,
  ic_dinner,
  ic_eat_less_salt,
  IC_END_DAY_GOAL,
  ic_enjoy_shower,
  ic_fruits,
  ic_get_cooking,
  ic_get_full_night_sleep,
  ic_groom_myself,
  ic_hone_my_skill,
  ic_inbox_zero,
  ic_internet_break,
  ic_join_club,
  ic_learn_craft,
  ic_learn_language,
  ic_light_exercise,
  ic_list_not_to_do,
  ic_list_to_do,
  ic_love_pet,
  ic_lunch,
  ic_make_everything_game,
  ic_make_my_bed,
  ic_manage_life,
  ic_meditate,
  ic_music,
  ic_musical_instrument,
  IC_NOTIFICATION,
  ic_no_sugar,
  ic_nuts,
  ic_party_party,
  ic_plan_tree,
  ic_power_nap,
  ic_quote_day,
  ic_read,
  ic_reconnect_friends,
  IC_REPEAT,
  ic_romantic_date,
  ic_saturated_fat,
  ic_seafood,
  ic_sport_event,
  ic_stretch,
  ic_take_vitamins,
  ic_talk_myself,
  ic_talk_parents,
  ic_talk_with_someone,
  ic_tea,
  ic_teach_my_pet,
  ic_tidy_up,
  ic_travel,
  ic_travel_myself,
  ic_try_again,
  ic_try_DIY,
  ic_try_yoga,
  ic_visit_relatives,
  ic_volunteer_work,
  ic_water,
  ic_whole_grain,
  ic_work_hard,
  ic_work_secret_project,
  ic_write_things_down,
} from '../../../utils/icons';
import CalendarStore from '../../calendar/store/calendar_store';
import ChallengeStore, {SAVE_ARR_CHALLENGES} from '../store/challenge_store';
import i18n from '../../../utils/i18n';
import NotificationStore, {
  SAVE_NOTIFICATION,
} from '../../settings/store/notification_store';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  getObjectDataLocal,
  saveObjectDataLocal,
} from '../../../services/storage';
import {TIME_NOTI_CHALLENGE} from '../../settings/screens/notification_screen';

interface NewChallengeProps {
  calendarStore: CalendarStore;
  uiStore: UIStore;
  navigation: NavigationProp<ParamListBase>;
  route: any;
  challengeStore: ChallengeStore;
  notificationStore: NotificationStore;
}

interface ItemProps {
  image: ImageSourcePropType;
  field: string;
  content: any;
  click: () => void;
  uiStore: UIStore;
}

interface ChildProps {
  img?: ImageSourcePropType;
  txt: string;
  onClick: () => void;
  isIcon: boolean;
}

const Item = ({image, field, content, click, uiStore}: ItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={click}>
      <View>
        <View style={styles.containerItem}>
          <Image style={styles.imgItem} source={image} />
          <View style={styles.viewContent}>
            <View style={styles.txtItem}>
              <Text style={styles.txtField}>{field}</Text>
              <View style={styles.rightItem}>
                <Text style={styles.txtContent}>{content}</Text>
                <Image style={styles.iconRight} source={IC_ARROW_RIGHT} />
              </View>
            </View>
            <View
              style={[
                styles.line,
                {
                  backgroundColor:
                    uiStore.bgMode == 'dark'
                      ? '#FFF'
                      : AppStyle.BGColor.GrayDark,
                  opacity: uiStore.bgMode == 'dark' ? 1 : 0.2,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const NewChallenge = observer(
  ({
    calendarStore,
    uiStore,
    navigation,
    route,
    challengeStore,
    notificationStore,
  }: NewChallengeProps) => {
    const current = new Date(calendarStore.curDate);
    const [text, setText] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [color, setColor] = useState('#f47c33');
    const [icon, setIcon] = useState<ImageSourcePropType | null>(
      route.params?.randomTask ? null : ic_tea,
    );
    const [type, setType] = useState('every_day');
    const [notification, setNotification] = useState(false);
    const [data, setData] = useState<Array<ActivityType>>([]);
    const [date, setDate] = useState(current);
    const [dateEnd, setDateEnd] = useState(current);
    const [open, setOpen] = useState<boolean>(false);
    const [openEnd, setOpenEnd] = useState<boolean>(false);
    const [textHeader, setTextHeader] = useState('New Challenge');
    const [dateNotification, setDateNotification] = useState(
      new Date(current.getTime() + 8 * 60 * 60 * 1000),
    );
    const toggleSwitch = () => {
      if (type == 'never') {
        Alert.alert('khong duoc');
      } else {
        setIsEnabled(previousState => !previousState);
        setNotification(!notification);
      }
    };

    const Child = ({img, txt, onClick, isIcon}: ChildProps) => {
      return (
        <View style={styles.viewIcColor}>
          <TouchableOpacity
            onPress={onClick}
            style={[
              styles.btnIcon,
              {
                backgroundColor:
                  uiStore.bgMode === 'light'
                    ? AppStyle.BGColor.White
                    : AppStyle.BGColor.GrayDark,
              },
            ]}>
            {isIcon && img ? (
              <Image style={[styles.icon, {tintColor: color}]} source={img} />
            ) : (
              <View style={[styles.color, {backgroundColor: color}]} />
            )}
          </TouchableOpacity>
          <Text style={styles.txtIcColor}>{txt}</Text>
        </View>
      );
    };

    const ItemIcon = item => {
      return (
        <TouchableOpacity
          onPress={() => {
            setIcon(item.imgIcon);
            setModalVisible(!modalVisible);
          }}
          style={styles.btnItemIcon}>
          <View style={styles.containerItemIcon}>
            <Image style={styles.icon} source={item.imgIcon} />
            {/* <Image style={styles.imgTick} source={IC_TICK} /> */}
          </View>
        </TouchableOpacity>
      );
    };

    const getDate = async () => {
      let checkTime = await getObjectDataLocal(TIME_NOTI_CHALLENGE);
      let datet = new Date(checkTime);
      if (checkTime) {
        setDateNotification(datet);
      }
    };

    useEffect(() => {
      let dataIcon: ActivityType[] = [];
      ArrActivities.forEach(element => {
        if (element.id >= 1000) {
          dataIcon.push(element);
        }
        setData(dataIcon);
      });
      if (route.params?.type) {
        setType(route.params.type);
      }
      if (route.params?.randomTask) {
        setTextHeader('Daily Challenge');
        const random = Math.floor(Math.random() * dataIcon.length);
        const randomColor = Math.floor(Math.random() * dataColors.length);
        setIcon(getImage(dataIcon[random].image));
        setText(dataIcon[random].image);
        setColor(dataColors[randomColor].color);
      }
      if (route.params?.valueChallenge) {
        const randomColor = Math.floor(Math.random() * dataColors.length);
        setColor(dataColors[randomColor].color);
        setText(route.params?.valueChallenge.name);
        setIcon(getImage(route.params?.valueChallenge.image));
      }
      if (current.getMonth() == 11) {
        let getDateEnd = new Date(
          current.getFullYear() + 1,
          0,
          current.getDate() + 1,
        );
        getDateEnd.setUTCHours(0);
        getDateEnd.setMinutes(0);
        getDateEnd.setSeconds(0);
        getDateEnd.setMilliseconds(0);
        setDateEnd(getDateEnd);
      } else {
        let getEndDate = new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          current.getDate() + 1,
        );
        getEndDate.setUTCHours(0);
        getEndDate.setMinutes(0);
        getEndDate.setSeconds(0);
        getEndDate.setMilliseconds(0);
        setDateEnd(getEndDate);
      }
    }, [route.params]);
    const onIcon = () => {
      setModalVisible(true);
    };
    const onColor = () => {
      setModal(true);
    };

    const getImage = (images: string) => {
      switch (images) {
        case 'ic_breakfast':
          return ic_breakfast;
        case 'ic_lunch':
          return ic_lunch;
        case 'ic_dinner':
          return ic_dinner;
        case 'ic_water':
          return ic_water;
        case 'ic_tea':
          return ic_tea;
        case 'ic_fruits':
          return ic_fruits;
        case 'ic_nuts':
          return ic_nuts;
        case 'ic_seafood':
          return ic_seafood;
        case 'ic_whole_grain':
          return ic_whole_grain;
        case 'ic_no_sugar':
          return ic_no_sugar;
        case 'ic_saturated_fat':
          return ic_saturated_fat;
        case 'ic_eat_less_salt':
          return ic_eat_less_salt;
        case 'ic_take_vitamins':
          return ic_take_vitamins;
        case 'ic_tidy_up':
          return ic_tidy_up;
        case 'ic_light_exercise':
          return ic_light_exercise;
        case 'ic_make_my_bed':
          return ic_make_my_bed;
        case 'ic_stretch':
          return ic_stretch;
        case 'ic_a_walk_per_day':
          return ic_a_walk_per_day;
        case 'ic_try_yoga':
          return ic_try_yoga;
        case 'ic_meditate':
          return ic_meditate;
        case 'ic_sport_event':
          return ic_sport_event;
        case 'ic_check_my_health':
          return ic_check_my_health;
        case 'ic_get_cooking':
          return ic_get_cooking;
        case 'ic_talk_parents':
          return ic_talk_parents;
        case 'ic_reconnect_friends':
          return ic_reconnect_friends;
        case 'ic_join_club':
          return ic_join_club;
        case 'ic_travel':
          return ic_travel;
        case 'ic_romantic_date':
          return ic_romantic_date;
        case 'ic_visit_relatives':
          return ic_visit_relatives;
        case 'ic_talk_with_someone':
          return ic_talk_with_someone;
        case 'ic_love_pet':
          return ic_love_pet;
        case 'ic_breath_slowly':
          return ic_breath_slowly;
        case 'ic_brush_teeth':
          return ic_brush_teeth;
        case 'ic_groom_myself':
          return ic_groom_myself;
        case 'ic_enjoy_shower':
          return ic_enjoy_shower;
        case 'ic_write_things_down':
          return ic_write_things_down;
        case 'ic_read':
          return ic_read;
        case 'ic_power_nap':
          return ic_power_nap;
        case 'ic_get_full_night_sleep':
          return ic_get_full_night_sleep;
        case 'ic_internet_break':
          return ic_internet_break;
        case 'ic_music':
          return ic_music;
        case 'ic_talk_myself':
          return ic_talk_myself;
        case 'ic_learn_language':
          return ic_learn_language;
        case 'ic_learn_craft':
          return ic_learn_craft;
        case 'ic_hone_my_skill':
          return ic_hone_my_skill;
        case 'ic_musical_instrument':
          return ic_musical_instrument;
        case 'ic_commit_my_plan':
          return ic_commit_my_plan;
        case 'ic_work_hard':
          return ic_work_hard;
        case 'ic_inbox_zero':
          return ic_inbox_zero;
        case 'ic_manage_life':
          return ic_manage_life;
        case 'ic_list_to_do':
          return ic_list_to_do;
        case 'ic_list_not_to_do':
          return ic_list_not_to_do;
        case 'ic_try_again':
          return ic_try_again;
        case 'ic_work_secret_project':
          return ic_work_secret_project;
        case 'ic_try_DIY':
          return ic_try_DIY;
        case 'ic_be_an_artist':
          return ic_be_an_artist;
        case 'ic_make_everything_game':
          return ic_make_everything_game;
        case 'ic_quote_day':
          return ic_quote_day;
        case 'ic_party_party':
          return ic_party_party;
        case 'ic_travel_myself':
          return ic_travel_myself;
        case 'ic_plan_tree':
          return ic_plan_tree;
        case 'ic_teach_my_pet':
          return ic_teach_my_pet;
        case 'ic_volunteer_work':
          return ic_volunteer_work;
        default:
          break;
      }
    };

    const dataColors = [
      {id: 1, color: '#f47c33'},
      {id: 2, color: '#e94f6b'},
      {id: 3, color: '#5ad68e'},
      {id: 4, color: '#3b9af8'},
      {id: 5, color: '#f8bd47'},
      {id: 6, color: '#7f99e6'},
    ];

    const onRepeat = () => {
      navigation.navigate('Repeat', {
        type: type,
      });
    };
    const onStartDate = () => {
      setOpen(true);
    };
    const onEndDate = () => {
      setOpenEnd(true);
    };
    return (
      <MainView
        uiStore={uiStore}
        childView={
          <KeyboardAvoidingView style={{flex: 1}}>
            <BaseHeader
              centerElement={
                <Text style={styles.txtCenterElement}>{textHeader}</Text>
              }
              leftElement={
                <Image
                  style={[
                    styles.leftElementStyle,
                    {
                      tintColor:
                        uiStore.bgMode === 'light'
                          ? AppStyle.MoreColors.OrangeMain
                          : AppStyle.MoreColors.BlueMain,
                    },
                  ]}
                  source={ic_arrow_left_orange}
                />
              }
              leftAction={() => navigation.goBack()}
            />
            <View style={styles.container}>
              <View
                style={[
                  styles.viewInput,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.GrayDark,
                  },
                ]}>
                <Image
                  style={[styles.iconInput, {tintColor: color}]}
                  source={icon}
                />
                <TextInput
                  style={[styles.input, {opacity: text ? 1 : 0.7}]}
                  onChangeText={e => {
                    setText(e);
                  }}
                  defaultValue={
                    route.params?.randomTask ? i18n.t(`challenges.${text}`) : ''
                  }
                  placeholder={i18n.t('challenges.enter_name')}
                  placeholderTextColor={
                    uiStore.bgMode == 'dark'
                      ? AppStyle.MoreColors.ThumbDeactived
                      : AppStyle.BGColor.Gray
                  }
                />
              </View>
              <View style={styles.viewSecond}>
                <Child
                  img={icon}
                  txt={i18n.t('challenges.icon')}
                  onClick={onIcon}
                  isIcon={true}
                />
                <Child
                  txt={i18n.t('challenges.color')}
                  onClick={onColor}
                  isIcon={false}
                />
              </View>
              <View
                style={[
                  styles.viewThird,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.GrayDark,
                  },
                ]}>
                <Item
                  image={IC_REPEAT}
                  field={i18n.t('challenges.repeat')}
                  content={i18n.t(`challenges.${type}`)}
                  click={onRepeat}
                  uiStore={uiStore}
                />
                <Item
                  click={onStartDate}
                  image={IC_DATE}
                  field={i18n.t('challenges.start_date')}
                  content={moment(date).format('DD MM YYYY')}
                  uiStore={uiStore}
                />
                <Item
                  image={IC_END_DAY_GOAL}
                  field={i18n.t('challenges.end_date')}
                  content={moment(dateEnd).format('DD MM YYYY')}
                  click={onEndDate}
                  uiStore={uiStore}
                />
                <View style={styles.containerItem}>
                  <Image style={styles.imgItem} source={IC_NOTIFICATION} />
                  <View style={styles.reminder}>
                    <Text style={styles.txtField}>
                      {i18n.t('challenges.reminders')}
                    </Text>
                    <Switch
                      trackColor={{false: '#3b3d4c', true: '#38c55c'}}
                      thumbColor={'#FFF'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>

                {/* Modal Icon */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                  visible={modalVisible}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                      <View
                        style={[
                          styles.modalView,
                          {
                            backgroundColor:
                              uiStore.bgMode === 'light'
                                ? AppStyle.BGColor.White
                                : AppStyle.BGColor.GrayDark,
                          },
                        ]}>
                        <Text style={styles.txtLikeIcon}>
                          The icon i would like this
                        </Text>
                        <View style={styles.iconModal}>
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => {
                              return (
                                <ItemIcon imgIcon={getImage(item.image)} />
                              );
                            }}
                            numColumns={4}
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </TouchableOpacity>
                </Modal>
                {/* Modal Color */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => {
                    setModal(!modal);
                  }}
                  visible={modal}>
                  <TouchableOpacity
                    onPress={() => {
                      setModal(!modal);
                    }}
                    style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                      <View
                        style={[
                          styles.viewColors,
                          {
                            backgroundColor:
                              uiStore.bgMode === 'light'
                                ? AppStyle.BGColor.White
                                : AppStyle.BGColor.GrayDark,
                          },
                        ]}>
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={dataColors}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => {
                            return (
                              <View style={styles.selectColor}>
                                <TouchableOpacity
                                  onPress={() => {
                                    setColor(item.color);
                                    setModal(!modal);
                                  }}
                                  style={[
                                    styles.circle,
                                    {backgroundColor: item.color},
                                  ]}
                                />
                              </View>
                            );
                          }}
                          numColumns={3}
                        />
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: 'Quicksand-SemiBold',
                            fontSize: 20,
                            height: 40,
                          }}>
                          Variety of colors
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </TouchableOpacity>
                </Modal>
                {/* Modal Start Date */}
                <DatePicker
                  modal
                  locale={'vi'}
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={first => {
                    setOpen(false);
                    setDate(first);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  cancelText={'Done'}
                />
                {/* Modal End Date */}
                <DatePicker
                  modal
                  locale={'vi'}
                  mode="date"
                  open={openEnd}
                  date={dateEnd}
                  onConfirm={end => {
                    if (end < current) {
                      setOpenEnd(false);
                      Alert.alert('Khong duoc');
                    } else {
                      setOpenEnd(false);
                      setDateEnd(end);
                    }
                  }}
                  onCancel={() => {
                    setOpenEnd(false);
                  }}
                  cancelText={'Done'}
                />
              </View>
              <View
                style={[
                  styles.btnPromise,
                  {
                    opacity: text.length == 0 ? 0.5 : 1,
                    backgroundColor:
                      uiStore.bgMode == 'light'
                        ? AppStyle.BgMood.Rad
                        : AppStyle.BGColor.BlueSky,
                  },
                ]}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (text.length == 0) {
                      return;
                    } else {
                      challengeStore.addChallenge({
                        id: new Date().getTime(),
                        title: text,
                        repeat: type,
                        image: icon,
                        color: color,
                        startTime: date.getTime(),
                        endTime: dateEnd.getTime(),
                        notification: notification,
                        arrDone: [],
                      });
                      saveObjectDataLocal(
                        SAVE_ARR_CHALLENGES,
                        challengeStore.arrChallenges,
                      );
                      if (
                        notificationStore.notification == true &&
                        notification == true
                      ) {
                        Platform.OS == 'android'
                          ? PushNotification.localNotificationSchedule({
                              channelId: 'channel-id',
                              title: 'Complete Your Challenge',
                              message: `${i18n.t(`challenges.${text}`)}`,
                              date: dateNotification,
                              soundName: 'default',
                              when: dateNotification,
                              id: `${Math.floor(Math.random() * 500 + 500)}`,
                              repeatType: 'day',
                              repeatTime: notificationStore.getRepeat(
                                route.params?.type ? route.params.type : type,
                              ),
                            })
                          : PushNotificationIOS.scheduleLocalNotification({
                              fireDate: dateNotification.toISOString(),
                              userInfo: {
                                id: `${Math.floor(Math.random() * 500 + 500)}`,
                              },
                              alertTitle: 'Complete Your Challenge',
                              alertBody: i18n.t(`challenges.${text}`),
                              repeatInterval: 'day',
                            });
                      }
                      navigation.navigate('Challenge');
                    }
                  }}>
                  <View style={styles.promise}>
                    <Text style={styles.txtPromise}>
                      {i18n.t('challenges.promise')}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </KeyboardAvoidingView>
        }
      />
    );
  },
);

export default NewChallenge;
