import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UIStore from '../../../shared/store/ui';
import UserStore from '../../../shared/store/user';
import BaseHeader from '../../../shared/ui/containers/base_header';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import {IMG_AGREE_NOTI} from '../../../utils/icons';

interface NotiQuestionScreen {
  uiStore: UIStore;
  userStore: UserStore;
  navigation: any;
  rootNavigation: NavigationProp<ParamListBase>;
}

const NotiQuestionScreen = ({
  uiStore,
  userStore,
  navigation,
  rootNavigation,
}: NotiQuestionScreen) => {
  const onAgree = () => {
    const user = userStore.user;
    user.is_check_notification = true;
    userStore.setUserLocal(user);
  };
  const onIgnore = () => {
    const user = userStore.user;
    user.is_check_notification = false;
    userStore.setUserLocal(user);
  };

  const onNavi = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
    <MainView
      childView={
        <View style={styles.container}>
          <BaseHeader containerStyle={styles.header} />
          <View style={styles.wrapper}>
            <Text style={styles.title}>Smart reminder</Text>
            <Text style={styles.detail}>
              When you forgot to add a note of the day
            </Text>
            <Image style={styles.img} source={IMG_AGREE_NOTI} />
            <TouchableOpacity
              onPress={() => {
                onNavi();
                onAgree();
              }}
              style={[styles.btn, {backgroundColor: '#e8782b'}]}>
              <Text style={styles.txtBtn}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onNavi();
                onIgnore();
              }}
              style={styles.btn}>
              <Text style={[styles.txtBtn, {color: '#9f9f9f'}]}>Ignore</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      uiStore={uiStore}
    />
  );
};

export default NotiQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1fafc',
  },
  header: {
    backgroundColor: '#f1fafc',
  },
  wrapper: {
    alignItems: 'center',
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight,
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
    fontWeight: '900',
  },
  detail: {
    fontSize: 18,
  },
  img: {
    resizeMode: 'contain',
    width: AppStyle.Screen.FullWidth * 0.7,
    height: AppStyle.Screen.FullHeight * 0.6,
  },
  btn: {
    width: AppStyle.Screen.FullWidth * 0.6,
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
