if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.debug = () => {};
  console.trace = () => {};
}
console.warn = () => {};

import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {configure} from 'mobx';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  Linking,
  LogBox,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import Toast from 'react-native-easy-toast';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import CalendarStore from './modules/calendar/store/calendar_store';

import IntroNavigator from './modules/introduction/intro_navigator';
import CustomSplashScreen from './modules/pre-load/screens';
import Main from './navigators/main_navigator';
import CodePushStore from './shared/store/codepush';
import MoodStore from './shared/store/moodStore';
import UIStore from './shared/store/ui';
import UserStore from './shared/store/user';
import AlertModal from './shared/ui/containers/alert_modal';
import {CustomModal} from './shared/ui/containers/custom_modal';
import UICommon from './shared/ui/containers/ui_common';
import AppStyle from './shared/ui/styles/app.style';
import {alertInfo} from './utils/functions';
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION appppp:', notification);
    try {
      let data: string =
        Platform.OS === 'android'
          ? notification.data.media
          : notification.data.media;

      // postStore.setCurMedia(JSON.parse(data));
      // let timeout = setTimeout(() => {
      //   RootNavigation.navigate('', {});
      //   clearTimeout(timeout);
      // }, 500);
    } catch (error) {
      console.log(error);
    }
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  requestPermissions: true,

  largeIcon: 'ic_launcher',
  smallIcon: 'ic_notification',

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
});
PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

Platform.OS === 'ios' &&
  PushNotification.popInitialNotification(notification => {
    console.log('Initial Notification', notification);
    try {
      let data = notification.data.media;

      // postStore.setCurMedia(JSON.parse(data));
      // let timeout = setTimeout(() => {
      //   RootNavigation.navigate('RePostDetail', {});
      //   clearTimeout(timeout);
      // }, 500);
    } catch (error) {
      console.log(error);
    }
  });

if (!__DEV__) {
  console.log = () => null;
}

LogBox.ignoreAllLogs(true);

configure({
  enforceActions: 'never',
});

type AppProps = {};

const Stack = createNativeStackNavigator();

const App: React.FC<AppProps> = observer(() => {
  const [uiStore] = useState(() => new UIStore());
  const [codePushStore] = useState(() => new CodePushStore());
  const [userStore] = useState(() => new UserStore());
  const [moodStore] = useState(() => new MoodStore());
  const [calendarStore] = useState(() => new CalendarStore());

  const [upToDate, setUpToDate] = useState(true);
  const [codepushError, setCodepushError] = useState(false);
  let isMandatory = false;
  const appState = useRef(AppState.currentState);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // await userStore.setFCMToken(fcmToken);
      console.log('app userstore.user', userStore.user);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };
  // const handleLangChange = async () => {};

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  }

  const checkForUpdate = async () => {
    console.log('checking update');
    const deploymentKey = codePushStore.deploymentKey;
    console.log('deloyment key ', deploymentKey);
    const updateData = await CodePush.checkForUpdate(deploymentKey);
    console.log('deloyment key ', updateData);
    if (!updateData) {
      return;
    } else {
      isMandatory = updateData.isMandatory;
      await onUpToDate();
    }
  };

  const handleCodepushUpdate = async (numberTry: number = 3) => {
    const deploymentKey = codePushStore.deploymentKey;
    const syncOption = {
      // updateDialog: true,
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
      deploymentKey,
    };
    // Check update new version
    uiStore.showLoading(
      'downloading_codepush',
      'Checking new version and installing ...',
    );
    await CodePush.sync(
      syncOption,
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
    if (upToDate === true) {
      uiStore.hideLoading('downloading_codepush');
      restartApp();
    }
    if (codepushError) {
      if (numberTry === 0) {
        setCodepushError(false);
        uiStore.hideLoading('downloading_codepush');
        setTimeout(() => {
          alertInfo(
            '',
            'There are an error was appeared, cannot install new update version.',
            false,
            () => {},
          );
        });
      } else {
        await handleCodepushUpdate(numberTry - 1);
      }
    }
  };

  const codePushStatusDidChange = (status: CodePush.SyncStatus) => {
    console.log('codePushStatusDidChange status', status);
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        uiStore.changeCodepushState(false);
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        uiStore.changeCodepushState(true);
        setCodepushError(false);
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        uiStore.changeCodepushState(true);
        setCodepushError(false);
        setUpToDate(true);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        uiStore.changeCodepushState(true);
        setCodepushError(true);
        console.log('UNKNOWN_ERROR');
        break;
      default:
        break;
    }
  };

  const codePushDownloadDidProgress = (progress: any) => {
    console.log(
      'codePush download: ' +
        progress.receivedBytes +
        ' of ' +
        progress.totalBytes +
        ' received.',
    );
  };

  const onUpToDate = () => {
    handleCodepushUpdate();
  };

  const restartApp = () => {
    CodePush.allowRestart();
    CodePush.restartApp(true);
  };

  useEffect(() => {
    Orientation.lockToPortrait();

    if (!__DEV__) {
      codePushStore.setListener(checkForUpdate);
    }
    codePushStore.start();

    requestUserPermission();
    const subscriberMess = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      alertInfo(
        remoteMessage.notification?.title || '',
        remoteMessage.notification?.body || '',
        false,
        () => {},
      );
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage.data) {
        try {
          Linking.openURL(remoteMessage.data.appUrl);
        } catch (error) {}
      }
    });

    return () => {
      codePushStore.saveData();
    };
  }, []);

  StatusBar.setHidden(false);
  StatusBar.setBackgroundColor(AppStyle.BGColor.Main);
  StatusBar.setBarStyle('light-content');

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: AppStyle.BGColor.Black}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Splash"
              children={({route, navigation}) => (
                <CustomSplashScreen
                  navigation={navigation}
                  userStore={userStore}
                />
              )}
            />
            <Stack.Screen
              name="IntroNavigator"
              children={({route, navigation}) => (
                <IntroNavigator
                  uiStore={uiStore}
                  userStore={userStore}
                  rootNavigation={navigation}
                />
              )}
            />

            <Stack.Screen
              name="Main"
              children={({route, navigation}) => (
                <Main
                  rootNavigation={navigation}
                  uiStore={uiStore}
                  userStore={userStore}
                  moodStore={moodStore}
                  calendarStore={calendarStore}
                />
              )}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <UICommon store={uiStore} />
        <AlertModal uiStore={uiStore} />
        <CustomModal uiStore={uiStore} />
        <Toast
          ref={toast => {
            if (toast) {
              uiStore.setToast(toast);
            }
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
});

export default App;
