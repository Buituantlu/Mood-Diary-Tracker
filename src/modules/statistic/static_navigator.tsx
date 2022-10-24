import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import MoodStore from '../../shared/store/moodStore';
import UIStore from '../../shared/store/ui';
import UserStore from '../../shared/store/user';
import AppStyle from '../../shared/ui/styles/app.style';
import CalendarStore from '../calendar/store/calendar_store';
import StatisticScreen from './screens/statistic_screen';

const Stack = createNativeStackNavigator();

type StatisticNavigatorType = {
  rootNavigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  userStore: UserStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
};
const StatisticNavigator = ({
  rootNavigation,
  moodStore,
  uiStore,
  userStore,
  calendarStore,
}: StatisticNavigatorType) => {
  return (
    <View style={{flex: 1, backgroundColor: AppStyle.BGColor.Main}}>
      <Stack.Navigator
        initialRouteName="Statistic"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Statistic"
          children={({navigation}) => (
            <StatisticScreen
              uiStore={uiStore}
              userStore={userStore}
              calendarStore={calendarStore}
              moodStore={moodStore}
              rootNavigation={navigation}
            />
          )}
        />
      </Stack.Navigator>
    </View>
  );
};

export default StatisticNavigator;
