import {View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import UIStore from '../../shared/store/ui';
import AppStyle from '../../shared/ui/styles/app.style';
import ChallengeScreen from './screens/challenge_screen';
import MoodStore from '../../shared/store/moodStore';
import CalendarStore from '../calendar/store/calendar_store';
import ChallengeStore from './store/challenge_store';

const Stack = createNativeStackNavigator();

type ChallengeNavigatorType = {
  rootNavigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
  challengeStore: ChallengeStore;
};
const ChallengeNavigator = ({
  rootNavigation,
  uiStore,
  moodStore,
  calendarStore,
  challengeStore,
}: ChallengeNavigatorType) => {
  return (
    <View style={{flex: 1, backgroundColor: AppStyle.BGColor.Main}}>
      <Stack.Navigator
        initialRouteName="Challenge"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Challenge"
          children={({navigation}) => (
            <ChallengeScreen
              calendarStore={calendarStore}
              moodStore={moodStore}
              uiStore={uiStore}
              navigation={navigation}
              challengeStore={challengeStore}
            />
          )}
        />
      </Stack.Navigator>
    </View>
  );
};

export default ChallengeNavigator;
