import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UIStore from '../../shared/store/ui';
import AppStyle from '../../shared/ui/styles/app.style';
import IntroScreen from './screens/intro_screen';
import InfoUserScreen from '../info_user/screens/info_user_screen';
import UserStore, {LOCAL_USER_KEY} from '../../shared/store/user';
import NotiQuestionScreen from '../info_user/screens/noti_question';
import {FISRT_USEAPP_KEY} from '../../utils/constants';
import {getObjectDataLocal} from '../../services/storage';

const Stack = createNativeStackNavigator();

type IntroNavigatorType = {
  rootNavigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  userStore: UserStore;
};
const IntroNavigator = ({
  rootNavigation,
  uiStore,
  userStore,
}: IntroNavigatorType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isViewIntro, setIsViewIntro] = useState<String>();
  const [isSetNickName, setIsSetNickName] = useState();

  useEffect(() => {
    AsyncStorage.getItem(`${FISRT_USEAPP_KEY}`).then(res => {
      if (res != null) {
        setIsViewIntro(res);
      }
      const getNickName = async () => {
        const result = await getObjectDataLocal(LOCAL_USER_KEY);
        setIsSetNickName(result?.nickname);
        setIsLoading(false);
      };
      getNickName();
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: AppStyle.BGColor.Main}}>
      {isLoading ? (
        <View
          style={{
            width: AppStyle.Screen.FullWidth,
            height: AppStyle.Screen.FullHeight,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: AppStyle.BGColor.Black,
          }}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <Stack.Navigator
          initialRouteName={
            isViewIntro
              ? isSetNickName
                ? 'NotiQuestion'
                : 'InfoUser'
              : 'Intro'
          }
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Intro"
            children={({route, navigation}) => (
              <IntroScreen
                navigation={navigation}
                uiStore={uiStore}
                rootNavigation={navigation}
              />
            )}
          />
          <Stack.Screen
            name="InfoUser"
            children={({route, navigation}) => (
              <InfoUserScreen
                navigation={navigation}
                uiStore={uiStore}
                userStore={userStore}
              />
            )}
          />
          <Stack.Screen
            name="NotiQuestion"
            children={({route, navigation}) => (
              <NotiQuestionScreen
                navigation={navigation}
                uiStore={uiStore}
                userStore={userStore}
                rootNavigation={navigation}
              />
            )}
          />
        </Stack.Navigator>
      )}
    </View>
  );
};

export default IntroNavigator;
