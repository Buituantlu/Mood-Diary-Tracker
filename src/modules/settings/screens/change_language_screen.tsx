import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import UIStore from '../../../shared/store/ui';
import UserStore from '../../../shared/store/user';
import MainView from '../../../shared/ui/containers/main_view';
import BaseHeader from '../../../shared/ui/containers/base_header';
import AppStyle from '../../../shared/ui/styles/app.style';
import {
  ic_arrow_left_orange,
  IC_REPEAT,
  IC_TICK_REPEAT,
  IMG_EMOJI_GOOD,
  IMG_EMOJI_RAD,
} from '../../../utils/icons';
import BaseText from '../../calendar/component/text';
import i18n from '../../../utils/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {reaction} from 'mobx';

interface ChallengeDetailScreenProps {
  uiStore: UIStore;
  userStore: UserStore;
  navigation: NavigationProp<ParamListBase>;
}

const ChangeLanguageScreen = ({
  uiStore,
  userStore,
  navigation,
}: ChallengeDetailScreenProps) => {
  reaction(
    () => uiStore.language,
    language => {
      i18n.changeLanguage(language);
    },
  );

  const [selectedId, setSelectedId] = useState(null);

  const listLanguage = [
    {
      id: 0,
      img: IMG_EMOJI_GOOD,
      text: 'English',
      language: 'en',
    },
    {
      id: 1,
      img: IMG_EMOJI_RAD,
      text: 'Vietnamese',
      language: 'vi',
    },
  ];

  const ItemLanguage = ({isSelect, onPress, id, img, text, language}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View key={id} style={styles.boxItem}>
          <Image source={img} style={styles.imgItem} />
          <BaseText uiStore={uiStore} style={styles.txtItem} text={text} />
          <Image
            style={{width: 20, height: 20, position: 'absolute', right: 10}}
            source={
              isSelect || language === i18n.language ? IC_TICK_REPEAT : null
            }
          />
        </View>
        <View
          style={[
            styles.line,
            {
              borderBottomWidth: id < listLanguage.length - 1 ? 0.5 : 0,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  const onChangeLanguage = lang => {
    // i18n.changeLanguage(lang);
    uiStore.language = lang;
    AsyncStorage.setItem('language_key', lang);
    // RNRestart.Restart();
  };

  const renderItem = ({item}) => {
    const isSelect = item.id === selectedId ? true : false;
    return (
      <ItemLanguage
        id={item.id}
        img={item.img}
        text={item.text}
        isSelect={isSelect}
        language={item.language}
        onPress={() => (
          setSelectedId(item.id), onChangeLanguage(item.language)
        )}
      />
    );
  };

  return (
    <MainView
      childView={
        <View style={styles.container}>
          <BaseHeader
            leftElement={
              <Image
                style={[
                  styles.leftElementStyle,
                  {
                    tintColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.MoreColors.OrangeMain
                        : AppStyle.MoreColors.BlueMain,
                  },
                ]}
                source={ic_arrow_left_orange}
              />
            }
            leftAction={() => navigation.goBack()}
            centerElement={
              <Text style={styles.centerElementStyle}>
                {i18n.t('settings.title_change_language')}
              </Text>
            }
          />
          <View style={styles.wrapper}>
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
              {/* {listLanguage.map(item => {
                return (
                  <ItemLanguage
                    key={item.id}
                    onPress={item.onPress}
                    img={item.img}
                    text={item.text}
                  />
                );
              })} */}
              <FlatList
                renderItem={renderItem}
                data={listLanguage}
                extraData={selectedId}
              />
            </View>
          </View>
        </View>
      }
      uiStore={uiStore}
    />
  );
};

export default ChangeLanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  leftElementStyle: {
    width: 20,
    height: 20,
  },
  centerElementStyle: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  wrapper: {
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight,
    paddingHorizontal: 15,
    marginBottom: AppStyle.Screen.FullHeight * 0.1,
  },
  wrapperItem: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: AppStyle.MoreColors.White,
  },
  boxItem: {
    padding: 10,
    flexDirection: 'row',
    // backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  imgItem: {
    width: 25,
    height: 25,
  },
  txtItem: {
    marginLeft: 10,
  },
  line: {
    alignSelf: 'center',
    marginLeft: 20,
    borderBottomColor: '#e1e4ea',
    width: AppStyle.Screen.FullWidth - 50,
  },
});
