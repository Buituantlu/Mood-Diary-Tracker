import * as React from 'react';
import {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {getObjectDataLocal} from '../../../services/storage';
import UserStore, {LOCAL_USER_KEY} from '../../../shared/store/user';
import AppStyle from '../../../shared/ui/styles/app.style';

interface CustomSplashScreenProps {
  navigation: any;
  userStore: UserStore;
}

const CustomSplashScreen = ({
  navigation,
  userStore,
}: CustomSplashScreenProps) => {
  const [isLoading, changeLoading] = React.useState<boolean>(true);
  // const checkUser = async () => {
  //   await userStore.getUserInfo();
  //   changeLoading(false);
  //   (!userStore.user.device_id || userStore.user.device_id === '') &&
  //     (await userStore.createUser());
  // };
  const checkUser = async () => {
    await userStore.getUser();
    changeLoading(false);
  };

  useEffect(() => {
    /**
     * @description load data if need
     */
    // setTimeout(() => {
    checkUser().then(() => {
      getObjectDataLocal(LOCAL_USER_KEY).then(res => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name:
                res?.is_check_notification !== undefined
                  ? 'Main'
                  : 'IntroNavigator',
            },
          ],
        });
      });
    });
    // }, 2000);
    return;
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image source={BG_SPLASH} style={styles.bgImage} /> */}
      {/* <Image source={LOGO} style={styles.icon} /> */}
      <ActivityIndicator
        style={styles.indicator}
        size="small"
        animating={isLoading}
      />
    </View>
  );
};

export default CustomSplashScreen;

const LOGO_WIDTH = AppStyle.Screen.FullWidth * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.BGColor.Main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  icon: {
    width: LOGO_WIDTH,
    height: (LOGO_WIDTH * 712) / 254, // logo size: 263 x 232
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  indicator: {
    top: AppStyle.Screen.FullHeight / 2 + 64,
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
  },
});
