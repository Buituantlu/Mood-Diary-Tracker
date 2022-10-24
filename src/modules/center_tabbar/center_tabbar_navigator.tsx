import {View} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import UIStore from '../../shared/store/ui';
import AppStyle from '../../shared/ui/styles/app.style';
import MoodStore from '../../shared/store/moodStore';
import CalendarStore from '../calendar/store/calendar_store';
import CenterTabbarScreen from './screen/center_tabbar_screen';
import AddMoodDetail from './screen/add_mood_detail';
import EditMoodScreen from './screen/edit_mood_screen';

const Stack = createNativeStackNavigator();

type CenterTabBarNavigatorType = {
  rootNavigation: NavigationProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  calendarStore: CalendarStore;
  moodStore: MoodStore;
};
const CenterTabBarNavigator = ({
  rootNavigation,
  navigation,
  uiStore,
  calendarStore,
  moodStore,
}: CenterTabBarNavigatorType) => {
  return (
    <View style={{flex: 1, backgroundColor: AppStyle.BGColor.Main}}>
      <Stack.Navigator
        initialRouteName="CenterTabBar"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="CenterTabBar"
          children={({route, navigation}) => (
            <CenterTabbarScreen
              route={route}
              rootNavigation={rootNavigation}
              navigation={navigation}
              calendarStore={calendarStore}
              uiStore={uiStore}
              moodStore={moodStore}
            />
          )}
        />
        <Stack.Screen
          name="AddMoodDetail"
          children={({route, navigation}) => {
            return (
              <AddMoodDetail
                route={route}
                navigation={navigation}
                rootNavigation={rootNavigation}
                calendarStore={calendarStore}
                uiStore={uiStore}
                moodStore={moodStore}
              />
            );
          }}
        />
        <Stack.Screen
          name="EditMoodScreen"
          children={({route, navigation}) => {
            return (
              <EditMoodScreen
                route={route}
                navigation={navigation}
                calendarStore={calendarStore}
                uiStore={uiStore}
                moodStore={moodStore}
              />
            );
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default CenterTabBarNavigator;
