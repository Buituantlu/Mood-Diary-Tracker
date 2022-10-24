import {View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import UIStore from '../../shared/store/ui';
import AppStyle from '../../shared/ui/styles/app.style';
import SettingScreen from './screens/setting_screen';
import UserStore from '../../shared/store/user';

const Stack = createNativeStackNavigator();

type SettingNavigatorType = {
  rootNavigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  userStore: UserStore;
  navigation: NavigationProp<ParamListBase>;
};
const SettingNavigator = ({
  rootNavigation,
  navigation,
  uiStore,
  userStore,
}: SettingNavigatorType) => {
  return (
    <View style={{flex: 1, backgroundColor: AppStyle.BGColor.Main}}>
      <Stack.Navigator
        initialRouteName="Setting"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Setting"
          children={({navigation}) => (
            <SettingScreen
              uiStore={uiStore}
              userStore={userStore}
              rootNavigation={rootNavigation}
              navigation={navigation}
            />
          )}
        />
      </Stack.Navigator>
    </View>
  );
};

export default SettingNavigator;
