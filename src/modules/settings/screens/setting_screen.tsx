import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {reaction} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {useEffect} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import UIStore from '../../../shared/store/ui';
import UserStore from '../../../shared/store/user';
import BaseHeader from '../../../shared/ui/containers/base_header';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {
  ic_achievemnets,
  ic_arrow_right_black,
  ic_feedback,
  ic_mood_sets,
  ic_night_mode,
  ic_notification,
  ic_settings_images,
  ic_setting_info,
  ic_setting_language,
  ic_setting_passcode,
  ic_setting_privacy,
  ic_setting_rate,
  ic_setting_term,
  ic_share,
  ic_version_app,
  img_screen_dark,
  img_screen_light,
} from '../../../utils/icons';
import BaseText from '../../calendar/component/text';
interface SettingScreenProps {
  uiStore: UIStore;
  userStore: UserStore;
  navigation: any;
  rootNavigation: NavigationProp<ParamListBase>;
}
const APP_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_ID = 'id284882215';
const versionApp = DeviceInfo.getVersion();

const ItemSetting = props => {
  return (
    <View>
      <TouchableOpacity style={styles.boxItem} onPress={props.onPress}>
        <Image style={styles.iconItem} source={props.image} />
        <BaseText
          uiStore={props.uiStore}
          style={styles.txtItem}
          text={props.text}
        />
        <Image
          style={[styles.iconRightItem, {tintColor: props.color}]}
          source={ic_arrow_right_black}
        />
      </TouchableOpacity>
      {props.id === 1 || props.id === 6 || props.id === 11 ? null : (
        <View style={styles.line} />
      )}
    </View>
  );
};

const SettingScreen = observer(
  ({uiStore, userStore, rootNavigation, navigation}: SettingScreenProps) => {
    const user = userStore.user;
    const toggleSwitch = () => {
      user.automaticDarkMode = !user.automaticDarkMode;
      userStore.setUserLocal(user);
    };
    const currentHours = new Date().getHours();
    if (userStore.user.automaticDarkMode === true) {
      if (currentHours >= 18) {
        if (uiStore.bgMode === 'light') {
          uiStore.setBgMode('dark');
        }
      } else {
        if (uiStore.bgMode === 'dark') {
          uiStore.setBgMode('light');
        }
      }
    }

    const onRate = () => {
      Alert.alert(
        'Rate us',
        'Would you like to share your review with us? This will help and motivate us a lot.',
        [
          {text: 'Sure', onPress: () => openStore()},
          {
            text: 'No Thanks!',
            onPress: () => console.log('No Thanks Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    };

    const openStore = () => {
      if (Platform.OS !== 'ios') {
        Linking.openURL(`market://details?id=${APP_PACKAGE_NAME}`).catch(
          error =>
            // eslint-disable-next-line no-alert
            Alert.alert('Please check for Google Play Store'),
        );
      } else {
        Linking.openURL(
          `itms-apps://itunes.apple.com/app/id${APPLE_ID}?mt=8`,
          // eslint-disable-next-line no-alert
        ).catch(error => Alert.alert('Please check for the App Store'));
      }
    };

    const onFeedback = () =>
      Linking.openURL(
        'mailto:supportnam@example.com?subject=Feedback&body=' +
          '1.I have some suggestions to share with you:\n\n\n' +
          '2.I want complain about:\n\n\n' +
          '3. I love MojiNote about:\n\n\n',
      );

    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );

    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);

    const listItem1 = [
      {
        id: 0,
        text: i18n.t('settings.photos'),
        image: ic_settings_images,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => navigation.navigate('PhotoScreen'),
      },
      {
        id: 1,
        text: i18n.t('settings.select_your_character'),
        image: ic_mood_sets,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => {},
      },
    ];

    const listItem2 = [
      {
        id: 2,
        text: i18n.t('settings.achievements'),
        image: ic_achievemnets,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => {},
      },
      {
        id: 3,
        text: i18n.t('settings.passcode'),
        image: ic_setting_passcode,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => {},
      },
      {
        id: 4,
        text: i18n.t('settings.notification'),
        image: ic_notification,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => {
          navigation.navigate('NotificationScreen');
        },
      },
      {
        id: 5,
        text: i18n.t('settings.change_language'),
        image: ic_setting_language,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => navigation.navigate('ChangeLanguage'),
      },
    ];

    const listItem3 = [
      {
        id: 7,
        text: i18n.t('settings.feedback'),
        image: ic_feedback,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => onFeedback(),
      },
      {
        id: 8,
        text: i18n.t('settings.rate'),
        image: ic_setting_rate,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => onRate(),
      },
      {
        id: 9,
        text: i18n.t('settings.share_with_friends'),
        image: ic_share,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: async () => {
          await Share.share({
            message:
              'https://itunes.apple.com/app/apple-store/id1488887950?mt=8',
          });
        },
      },
      {
        id: 10,
        text: i18n.t('settings.terms'),
        image: ic_setting_term,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () =>
          Linking.openURL('https://sites.google.com/view/mooddiaryterms'),
      },
      {
        id: 11,
        text: i18n.t('settings.privacy_policy'),
        image: ic_setting_privacy,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () =>
          Linking.openURL('https://sites.google.com/view/mooddiary-policy'),
      },
    ];

    const dataMode = [
      {
        id: 0,
        img: img_screen_light,
        onPress: () => {
          uiStore.setBgMode('light');
        },
        text: 'Light',
        style: uiStore.bgMode !== 'light' ? null : {backgroundColor: '#3986f8'},
      },
      {
        id: 1,
        img: img_screen_dark,
        onPress: () => {
          uiStore.setBgMode('dark');
        },
        text: 'Dark',
        style: uiStore.bgMode !== 'dark' ? null : {backgroundColor: '#3986f8'},
      },
    ];

    if (Platform.OS === 'ios') {
      listItem2.push({
        id: 6,
        text: 'Widget Help Center',
        image: ic_setting_info,
        color:
          uiStore.bgMode === 'light'
            ? AppStyle.TextColor.Black
            : AppStyle.TextColor.White,
        uiStore: uiStore,
        onPress: () => navigation.navigate('WidgetHelpCenter'),
      });
    }

    return (
      <MainView
        childView={
          <View style={styles.container}>
            <BaseHeader
              containerStyle={styles.header}
              centerElement={
                <BaseText
                  uiStore={uiStore}
                  style={styles.txtCenterElement}
                  text={i18n.t('settings.settings')}
                />
              }
              rightElement={
                <View
                  style={[
                    styles.customButtonRight,
                    {backgroundColor: userStore.user.color_user},
                  ]}>
                  <Image
                    style={styles.rightIcon}
                    source={userStore.user.avatar}
                  />
                </View>
              }
              rightAction={() => navigation.navigate('ChangeInfo')}
            />
            <ScrollView style={styles.wrapper}>
              <TouchableOpacity>
                <ImageBackground style={styles.banner} source={{}}>
                  <View>
                    <Text style={styles.txtTitleBanner}>MojiNote Pro</Text>
                    <Text style={styles.txtDetailBanner}>
                      Unlock Pro to Get {'\n'}Bonus Features
                    </Text>
                  </View>
                  <View style={styles.btnBanner}>
                    <Text style={{color: '#000'}}>Learn more</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View
                style={[
                  styles.wrapperItem,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.BGDarkMode,
                  },
                ]}>
                {listItem1.map(item => {
                  return (
                    <ItemSetting
                      key={item.id}
                      text={item.text}
                      image={item.image}
                      id={item.id}
                      color={item.color}
                      uiStore={item.uiStore}
                      onPress={item.onPress}
                    />
                  );
                })}
              </View>
              <View
                style={[
                  styles.wrapperItem,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.BGDarkMode,
                  },
                ]}>
                {listItem2.map(item => {
                  return (
                    <ItemSetting
                      key={item.id}
                      text={item.text}
                      image={item.image}
                      id={item.id}
                      color={item.color}
                      uiStore={item.uiStore}
                      onPress={item.onPress}
                    />
                  );
                })}
              </View>
              <View
                style={[
                  styles.wrapperItem,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.BGDarkMode,
                  },
                ]}>
                <View style={styles.wrapperNightMode}>
                  {dataMode.map(item => {
                    return (
                      <View key={item.id} style={styles.center}>
                        <Image style={styles.imgNightMode} source={item.img} />
                        <BaseText
                          uiStore={uiStore}
                          style={styles.txtNightMode}
                          text={item.text}
                        />
                        <TouchableWithoutFeedback onPress={item.onPress}>
                          <View style={styles.btnNightMode}>
                            <View
                              style={[styles.btnCoreNightMode, item.style]}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.boxItem}>
                  <Image style={styles.iconItem} source={ic_night_mode} />
                  <BaseText
                    uiStore={uiStore}
                    style={styles.txtItem}
                    text={'Automatic'}
                  />
                  <Switch
                    style={styles.switch}
                    trackColor={{
                      false: uiStore.bgMode === 'light' ? '#d3d2d7' : '#464752',
                      true: '#4ed058',
                    }}
                    thumbColor={user.automaticDarkMode ? '#FFFFFF' : '#FFFFFF'}
                    ios_backgroundColor={
                      uiStore.bgMode === 'light' ? '#d3d2d7' : '#464752'
                    }
                    onValueChange={toggleSwitch}
                    value={user.automaticDarkMode}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.wrapperItem,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.BGDarkMode,
                  },
                ]}>
                {listItem3.map(item => {
                  return (
                    <ItemSetting
                      key={item.id}
                      text={item.text}
                      image={item.image}
                      id={item.id}
                      color={item.color}
                      uiStore={item.uiStore}
                      onPress={item.onPress}
                    />
                  );
                })}
              </View>
              <View style={styles.wrapperItem}>
                <View
                  style={[
                    styles.boxItem,
                    {
                      backgroundColor:
                        uiStore.bgMode === 'light'
                          ? AppStyle.BGColor.White
                          : AppStyle.BGColor.BGDarkMode,
                    },
                  ]}>
                  <Image style={styles.iconItem} source={ic_version_app} />
                  <BaseText
                    uiStore={uiStore}
                    style={[styles.txtItem]}
                    text={i18n.t('settings.version')}
                  />
                  <BaseText
                    uiStore={uiStore}
                    style={styles.txtVersion}
                    text={`v${versionApp}`}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        }
        uiStore={uiStore}
      />
    );
  },
);

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight,
    // backgroundColor: '#f9f7f3',
  },
  header: {},
  rightIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  customButtonRight: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  txtCenterElement: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  wrapper: {
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight,
    paddingHorizontal: 15,
    marginBottom: AppStyle.Screen.FullHeight * 0.1,
  },
  banner: {
    width: '100%',
    height: AppStyle.Screen.FullHeight * 0.2,
    padding: 15,
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: 'skyblue',
  },
  txtTitleBanner: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  txtDetailBanner: {
    fontSize: 12,
    marginTop: 5,
    color: '#3e3e3e',
  },
  btnBanner: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: '45%',
    height: '35%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyle.MoreColors.White,
  },
  wrapperItem: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
  },
  boxItem: {
    paddingLeft: 10,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconItem: {
    width: 24,
    height: 25,
  },
  txtItem: {
    marginLeft: 10,
  },
  iconRightItem: {
    width: 12,
    height: 12,
    right: 10,
    position: 'absolute',
  },
  line: {
    height: 0.5,
    marginLeft: 40,
    marginRight: 10,
    backgroundColor: '#e1e4ea',
  },
  switch: {
    right: 10,
    position: 'absolute',
  },
  wrapperNightMode: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imgNightMode: {
    width: 55,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  txtNightMode: {
    marginTop: 10,
    marginBottom: 10,
  },
  btnNightMode: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#3986f8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCoreNightMode: {
    width: 16,
    height: 16,
    borderRadius: 100,
  },
  center: {
    alignItems: 'center',
  },
  txtVersion: {
    right: 10,
    position: 'absolute',
  },
});
