import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {observer} from 'mobx-react';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification';
import {
  getObjectDataLocal,
  saveObjectDataLocal,
} from '../../../services/storage';
import UIStore from '../../../shared/store/ui';
import BaseHeader from '../../../shared/ui/containers/base_header';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {ic_arrow_left_orange, IC_ARROW_RIGHT} from '../../../utils/icons';
import ChallengeStore from '../../challenge/store/challenge_store';
import NotificationStore from '../store/notification_store';

export const TIME_NOTI_CHALLENGE = 'TIME_NOTI_CHALLENGE';
export const TIME_NOTI_ENTRY = 'TIME_NOTI_ENTRY';

interface NotificationProps {
  uiStore: UIStore;
  navigation: NavigationProp<ParamListBase>;
  route: any;
  notificationStore: NotificationStore;
  challengeStore: ChallengeStore;
}
const ItemTime = observer(({title, time, click}) => {
  return (
    <View>
      <View
        style={{
          height: 1,
          width: AppStyle.Screen.FullWidth - 32,
          backgroundColor: 'dark',
          opacity: 1,
        }}
      />
      <View style={styles.fieldChild}>
        <Text style={styles.txtItem}>{title}</Text>
        <TouchableWithoutFeedback onPress={click}>
          <View style={styles.containerTime}>
            <View>
              <Text style={styles.txtTime}>{time}</Text>
            </View>
            <Image style={styles.iconRight} source={IC_ARROW_RIGHT} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
});

const NotificationScreen = observer(
  ({
    uiStore,
    navigation,
    route,
    notificationStore,
    challengeStore,
  }: NotificationProps) => {
    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    const [isEnabled, setIsEnabled] = useState(notificationStore.notification);
    const [date, setDate] = useState(
      new Date(now.getTime() + 20 * 60 * 60 * 1000),
    );
    const [open, setOpen] = useState<boolean>(false);
    const [dateTC, setDateTC] = useState(
      new Date(now.getTime() + 8 * 60 * 60 * 1000),
    );
    const [openTC, setOpenTC] = useState<boolean>(false);
    const toggleSwitch = () => {
      notificationStore.setNotification(!notificationStore.notification);
      if (isEnabled == false) {
        //push notification entry
        Platform.OS == 'android'
          ? PushNotification.localNotificationSchedule({
              channelId: 'channel-id',
              title: 'Today How Do You Fell?',
              when: date.getTime(),
              message: 'Lets Create New Mood',
              date: new Date(date),
              soundName: 'default',
              id: new Date().getTime(),
              repeatType: 'day',
              repeatTime: 1,
            })
          : PushNotificationIOS.scheduleLocalNotification({
              fireDate: new Date(date).toISOString(),
              userInfo: {id: new Date().getTime()},
              alertTitle: 'Today How Do You Fell?',
              repeatInterval: 'day',
              alertBody: 'Lets Create New Mood',
            });

        //push notification challenge
        notificationStore.arrNotiChallenge.forEach((e, index) => {
          Platform.OS == 'android'
            ? PushNotification.localNotificationSchedule({
                channelId: 'channel-id',
                title: 'Complete Your Challenge',
                when: dateTC.getTime(),
                message: i18n.t(`challenges.${e.title}`),
                date: new Date(dateTC),
                soundName: 'default',
                id: `${index + 1}`,
                repeatType: 'day',
                repeatTime: notificationStore.getRepeat(e.repeat),
              })
            : PushNotificationIOS.scheduleLocalNotification({
                fireDate: new Date(dateTC).toISOString(),
                userInfo: {id: `${index + 1}`},
                alertTitle: 'Complete Your Challenge',
                repeatInterval: 'day',
                alertBody: i18n.t(`challenges.${e.title}`),
              });
        });
      } else {
        PushNotification.cancelAllLocalNotifications();
        PushNotificationIOS.removeAllPendingNotificationRequests();
      }
      setIsEnabled(previousState => !previousState);
    };
    const onTimeEntry = () => {
      setOpen(true);
    };

    const onTimeChallenges = () => {
      setOpenTC(true);
    };

    const checkDate = async () => {
      let checkTime = await getObjectDataLocal(TIME_NOTI_ENTRY);
      let datet = new Date(checkTime);
      if (checkTime) {
        setDate(datet);
      }
    };
    const checkDateTC = async () => {
      let checkTime = await getObjectDataLocal(TIME_NOTI_CHALLENGE);
      let datet = new Date(checkTime);
      if (checkTime) {
        setDateTC(datet);
      }
    };

    useEffect(() => {
      notificationStore.arrNotiChallenge.splice(0);
      challengeStore.arrChallenges.forEach(e => {
        if (e.notification == true) {
          notificationStore.setArrNoti(e);
        }
      });
      checkDate();
      checkDateTC();
    }, [challengeStore.arrChallenges]);
    return (
      <MainView
        childView={
          <View>
            <BaseHeader
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
              centerElement={
                <Text style={styles.centerElementStyle}>
                  {i18n.t('settings.notification')}
                </Text>
              }
            />
            <View
              style={[
                styles.container,
                {backgroundColor: uiStore.bgMode == 'dark' ? 'dark' : 'light'},
              ]}>
              <TouchableOpacity
                // onPress={() => {
                //   PushNotificationIOS.scheduleLocalNotification({
                //     fireDate: new Date(date).toISOString(),
                //     userInfo: {id: '1'},
                //     alertTitle: 'Complete Your Challenge',
                //     alertBody: 'Hello',
                //     repeatInterval: 'day',
                //   });
                // }}
                style={{
                  width: AppStyle.Screen.FullWidth - 16,
                  height: AppStyle.Screen.FullHeight / 4,
                  backgroundColor: 'pink',
                  borderRadius: 10,
                  marginHorizontal: 8,
                }}
              />
              {/* <TouchableOpacity
                onPress={() => {
                  PushNotificationIOS.removeAllDeliveredNotifications();
                  PushNotificationIOS.removeAllPendingNotificationRequests();
                }}
                style={{height: 50, backgroundColor: 'red', width: 50}}
              /> */}
              <View
                style={[
                  styles.containerNoti,
                  {
                    backgroundColor:
                      uiStore.bgMode == 'dark'
                        ? AppStyle.BGColor.GrayDark
                        : AppStyle.BGColor.White,
                  },
                ]}>
                <View style={styles.fieldItem}>
                  <Text style={styles.txtItem}>Notification</Text>
                  <Switch
                    trackColor={{false: '#3b3d4c', true: '#38c55c'}}
                    thumbColor={'#FFF'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <ItemTime
                  title={'Set Time Entry'}
                  time={moment(date).format('HH:mm')}
                  click={onTimeEntry}
                />
                <ItemTime
                  title={'Set Time Challenges'}
                  time={moment(dateTC).format('HH:mm')}
                  click={onTimeChallenges}
                />
              </View>
              <DatePicker
                modal
                title={'Set Time'}
                locale="en_GB"
                mode="time"
                open={open}
                date={date}
                onConfirm={_a => {
                  notificationStore.setNotification(false);
                  setIsEnabled(false);
                  PushNotification.cancelAllLocalNotifications(`${date}`);
                  PushNotificationIOS.removeAllPendingNotificationRequests();
                  setOpen(false);
                  setDate(_a);
                  saveObjectDataLocal(TIME_NOTI_ENTRY, _a.getTime());
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <DatePicker
                modal
                title={'Set Time'}
                locale="en_GB"
                mode="time"
                open={openTC}
                date={dateTC}
                onConfirm={_e => {
                  PushNotification.cancelAllLocalNotifications(`${dateTC}`);
                  notificationStore.setNotification(false);
                  setIsEnabled(false);
                  PushNotificationIOS.removeAllPendingNotificationRequests();
                  setOpenTC(false);
                  setDateTC(_e);
                  saveObjectDataLocal(TIME_NOTI_CHALLENGE, _e.getTime());
                }}
                onCancel={() => {
                  setOpenTC(false);
                }}
              />
            </View>
          </View>
        }
        uiStore={uiStore}
      />
    );
  },
);

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  leftElementStyle: {
    width: 20,
    height: 20,
  },
  centerElementStyle: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  iconRight: {
    height: 12,
    width: 8,
    marginLeft: 10,
  },
  containerNoti: {
    height: 180,
    width: AppStyle.Screen.FullWidth - 32,

    marginTop: 24,
    borderRadius: 14,
  },
  fieldItem: {
    flexDirection: 'row',
    height: 60,
    width: AppStyle.Screen.FullWidth - 32,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  txtItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
  },
  fieldChild: {
    flexDirection: 'row',
    height: 59,
    width: AppStyle.Screen.FullWidth - 32,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  containerTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTime: {
    fontSize: 15,
    fontFamily: 'Quicksand-Medium',
  },
});
