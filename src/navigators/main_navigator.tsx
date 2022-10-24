import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ChallengeDetailScreen from '../modules/challenge/screens/challenge_detail_screen';
import CreateChallengeScreen from '../modules/challenge/screens/create_challenge_screen';
import IntroNavigator from '../modules/introduction/intro_navigator';
import ChangeInfoScreen from '../modules/settings/screens/change_info_screen';
import WidgetHelpCenterScreen from '../modules/settings/screens/widget_help_center_screen';
import CalendarStore from '../modules/calendar/store/calendar_store';
import CenterTabBarNavigator from '../modules/center_tabbar/center_tabbar_navigator';
import MoodStore from '../shared/store/moodStore';
import UIStore from '../shared/store/ui';
import UserStore from '../shared/store/user';
import AppStyle from '../shared/ui/styles/app.style';
import BottomTabbar from './tabbar_navigator';
import NewChallenge from '../modules/challenge/screens/new_challenge';
import Repeat from '../modules/challenge/screens/repeat';
import ChallengeStore from '../modules/challenge/store/challenge_store';
import PhotoScreen from '../modules/settings/screens/photo_screen';
import ChangeLanguageScreen from '../modules/settings/screens/change_language_screen';
import NotificationScreen from '../modules/settings/screens/notification_screen';
import NotificationStore from '../modules/settings/store/notification_store';

type MainProps = {
  rootNavigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  userStore: UserStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
};
const Stack = createNativeStackNavigator();

const Main: React.FC<MainProps> = observer(
  ({rootNavigation, uiStore, userStore}: MainProps) => {
    const [moodStore] = useState(() => new MoodStore());
    const [calendarStore] = useState(() => new CalendarStore());
    const [challengeStore] = useState(() => new ChallengeStore());
    const [notificationStore] = useState(() => new NotificationStore());
    return (
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Main"
            children={({route, navigation}) => (
              <BottomTabbar
                rootNavigation={navigation}
                uiStore={uiStore}
                userStore={userStore}
                moodStore={moodStore}
                calendarStore={calendarStore}
                challengeStore={challengeStore}
              />
            )}
          />
          <Stack.Screen
            name="CenterTabBar"
            children={({route, navigation}) => (
              <CenterTabBarNavigator
                rootNavigation={rootNavigation}
                navigation={navigation}
                uiStore={uiStore}
                moodStore={moodStore}
                calendarStore={calendarStore}
              />
            )}
            options={{presentation: 'transparentModal'}}
          />

          <Stack.Screen
            name="IntroNav"
            children={({navigation}) => (
              <IntroNavigator
                rootNavigation={navigation}
                uiStore={uiStore}
                userStore={userStore}
              />
            )}
          />
          <Stack.Screen
            name="ChangeLanguage"
            children={({navigation}) => (
              <ChangeLanguageScreen
                uiStore={uiStore}
                userStore={userStore}
                navigation={navigation}
              />
            )}
          />
          <Stack.Screen
            name="WidgetHelpCenter"
            children={({navigation}) => (
              <WidgetHelpCenterScreen
                uiStore={uiStore}
                rootNavigation={navigation}
                navigation={navigation}
              />
            )}
          />
          <Stack.Screen
            name="ChangeInfo"
            children={({navigation}) => (
              <ChangeInfoScreen
                uiStore={uiStore}
                userStore={userStore}
                navigation={navigation}
              />
            )}
          />
          <Stack.Screen
            name="CreateChallenge"
            children={({navigation}) => (
              <CreateChallengeScreen
                uiStore={uiStore}
                userStore={userStore}
                navigation={navigation}
              />
            )}
          />
          <Stack.Screen
            name="ChallengeDetailScreen"
            children={({navigation, route}) => (
              <ChallengeDetailScreen
                uiStore={uiStore}
                userStore={userStore}
                navigation={navigation}
                route={route}
              />
            )}
          />
          <Stack.Screen
            name="NewChallenge"
            children={({navigation, route}) => (
              <NewChallenge
                calendarStore={calendarStore}
                uiStore={uiStore}
                navigation={navigation}
                route={route}
                challengeStore={challengeStore}
                notificationStore={notificationStore}
              />
            )}
          />
          <Stack.Screen
            name="Repeat"
            children={({navigation, route}) => (
              <Repeat uiStore={uiStore} navigation={navigation} route={route} />
            )}
          />
          <Stack.Screen
            name="PhotoScreen"
            children={({navigation, route}) => (
              <PhotoScreen
                uiStore={uiStore}
                moodStore={moodStore}
                navigation={navigation}
              />
            )}
          />
          <Stack.Screen
            name="NotificationScreen"
            children={({navigation, route}) => (
              <NotificationScreen
                uiStore={uiStore}
                navigation={navigation}
                route={route}
                notificationStore={notificationStore}
                challengeStore={challengeStore}
              />
            )}
          />
        </Stack.Navigator>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.BGColor.Main,
  },
  modalView: {
    alignItems: 'center',
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight,
    elevation: 5,
  },
  header: {},
  rightIcon: {
    width: 50,
    resizeMode: 'contain',
  },
  leftIcon: {
    width: 40,
    resizeMode: 'contain',
  },
  boxTitle: {
    marginTop: 30,
    alignItems: 'center',
  },
  txtTitle: {
    fontWeight: '700',
    fontSize: 28,
    color: '#FFFFFF',
  },
  txtDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  boxDate: {
    width: AppStyle.Screen.FullWidth * 0.6,
    height: 50,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.15)',
  },
  emojiOption: {
    width: AppStyle.Screen.FullWidth - 10,
    height: 150,
    marginTop: 30,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppStyle.BGColor.White,
  },
  emojiItem: {
    width: (AppStyle.Screen.FullWidth - 10) * 0.2,
    height: 70,
    alignItems: 'center',
  },
  emojiStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  txtEmoji: {
    fontWeight: '600',
    fontSize: 15,
  },
});

export default Main;
