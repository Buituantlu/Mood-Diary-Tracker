import {View} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import UIStore from '../../shared/store/ui';
import AppStyle from '../../shared/ui/styles/app.style';
import CalendarStore from './store/calendar_store';
import MoodStore from '../../shared/store/moodStore';
import ScheduleScreen from './screens';
import UserStore from '../../shared/store/user';

const Stack = createNativeStackNavigator();

type CalendarNavigatorType = {
  rootNavigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  userStore: UserStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
};
const CalendarNavigator = ({
  rootNavigation,
  uiStore,
  userStore,
  moodStore,
  calendarStore,
}: CalendarNavigatorType) => {
  return (
    <View style={{flex: 1, backgroundColor: AppStyle.BGColor.Main}}>
      <Stack.Navigator
        initialRouteName="Calendar"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Calendar"
          children={({route, navigation}) => (
            <ScheduleScreen
              moodStore={moodStore}
              calendarStore={calendarStore}
              uiStore={uiStore}
              userStore={userStore}
              rootNavigation={rootNavigation}
              navigation={navigation}
              route={route}
            />
          )}
        />
      </Stack.Navigator>
    </View>
  );
};

export default CalendarNavigator;
