import * as React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import UIStore from '../../../shared/store/ui';
import MainView from '../../../shared/ui/containers/main_view';
import BaseHeader from '../../../shared/ui/containers/base_header';
import AppStyle from '../../../shared/ui/styles/app.style';
import {useState} from 'react';
import UserStore, {LOCAL_USER_KEY} from '../../../shared/store/user';
import {AvatarType} from '../../../shared/type/user';
import {
  ic_arrow_left_orange,
  IC_AVATAR_1,
  IC_AVATAR_10,
  IC_AVATAR_11,
  IC_AVATAR_12,
  IC_AVATAR_13,
  IC_AVATAR_14,
  IC_AVATAR_15,
  IC_AVATAR_16,
  IC_AVATAR_2,
  IC_AVATAR_3,
  IC_AVATAR_4,
  IC_AVATAR_5,
  IC_AVATAR_6,
  IC_AVATAR_7,
  IC_AVATAR_8,
  IC_AVATAR_9,
} from '../../../utils/icons';
import {getObjectDataLocal} from '../../../services/storage';
import i18n from '../../../utils/i18n';

interface InfoUserScreenProps {
  uiStore: UIStore;
  userStore: UserStore;
  navigation: any;
}

const numColumns = 4;

const ItemAvatar = ({onPress, borderColor, avatar, bgColorItem}) => {
  return (
    <View style={[styles.borderItemAvatar, {borderColor: borderColor}]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.itemAvatar, {backgroundColor: bgColorItem}]}>
          <Image source={avatar} style={styles.avt_item_style} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const InfoUserScreen = ({
  uiStore,
  userStore,
  navigation,
}: InfoUserScreenProps) => {
  const dataList = [
    {
      id: 0,
      avatar: IC_AVATAR_1,
      color: '#1225fe',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 1,
      avatar: IC_AVATAR_2,
      color: '#f1f1f1',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 2,
      avatar: IC_AVATAR_3,
      color: '#800000',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 3,
      avatar: IC_AVATAR_4,
      color: '#FF0000',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 4,
      avatar: IC_AVATAR_5,
      color: '#FBBA31',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 5,
      avatar: IC_AVATAR_6,
      color: '#FFFF00',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 6,
      avatar: IC_AVATAR_7,
      color: '#00FF00',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 7,
      avatar: IC_AVATAR_8,
      color: '#008000',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 8,
      avatar: IC_AVATAR_9,
      color: '#00FFFF',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 9,
      avatar: IC_AVATAR_10,
      color: '#0000FF',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 10,
      avatar: IC_AVATAR_11,
      color: '#000080',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 11,
      avatar: IC_AVATAR_12,
      color: '#FF00FF',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 12,
      avatar: IC_AVATAR_13,
      color: '#800080',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 13,
      avatar: IC_AVATAR_14,
      color: '#ADFF2F',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 14,
      avatar: IC_AVATAR_15,
      color: '#48D1CC',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
    {
      id: 15,
      avatar: IC_AVATAR_16,
      color: '#C0C0C0',
      bgColorItem:
        uiStore.bgMode === 'light'
          ? AppStyle.BGColor.BGMainLight
          : AppStyle.BGColor.BGMainDark,
    },
  ];
  const [activeColor, setActiveColor] = useState<any>(dataList[0].color);
  const [activeAvatar, setActiveAvatar] = useState<any>(dataList[0].avatar);
  const [textValue, setTextValue] = useState<string>('');
  const [checkNickName, setCheckNickName] = useState<string>('');
  const setInfo = () => {
    const user = userStore?.user;
    user.avatar = activeAvatar;
    user.nickname = textValue;
    user.color_user = activeColor;
    userStore.setUserLocal(user);
  };

  getObjectDataLocal(LOCAL_USER_KEY).then(result => {
    setCheckNickName(result.nickname);
  });

  const ItemColor = ({itemColor}: {itemColor: AvatarType}) => {
    const borderColor =
      activeColor == itemColor.color
        ? uiStore.bgMode === 'light'
          ? AppStyle.MoreColors.OrangeMain
          : AppStyle.MoreColors.BlueMain
        : uiStore.bgMode === 'light'
        ? AppStyle.BGColor.White
        : AppStyle.BGColor.BGDarkMode;
    return (
      <View
        style={[
          styles.borderItemColor,
          {
            borderColor: borderColor,
          },
        ]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setActiveColor(itemColor.color);
          }}>
          <View
            style={[
              styles.itemColor,
              {backgroundColor: `${itemColor.color}`},
            ]}></View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderItem = (item: AvatarType) => {
    const borderColor =
      activeAvatar == item.avatar
        ? uiStore.bgMode === 'light'
          ? AppStyle.MoreColors.OrangeMain
          : AppStyle.MoreColors.BlueMain
        : uiStore.bgMode === 'light'
        ? AppStyle.BGColor.White
        : AppStyle.BGColor.BGDarkMode;
    return (
      <ItemAvatar
        onPress={() => {
          setActiveAvatar(item.avatar);
        }}
        borderColor={borderColor}
        avatar={item.avatar}
        bgColorItem={item.bgColorItem}
      />
    );
  };

  return (
    <MainView
      childView={
        <View style={styles.container}>
          {checkNickName ? (
            <BaseHeader
              containerStyle={styles.headerStyle}
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
                  {i18n.t('nickname')}
                </Text>
              }
              rightElement={
                textValue ? (
                  <TouchableOpacity
                    onPress={() => {
                      setInfo();
                      navigation.goBack();
                    }}>
                    <Text
                      style={[
                        styles.rightElementStyle,
                        {
                          color:
                            uiStore.bgMode === 'light'
                              ? AppStyle.MoreColors.OrangeMain
                              : AppStyle.MoreColors.BlueMain,
                        },
                      ]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Text
                      style={[
                        styles.rightElementStyle,
                        {
                          color:
                            uiStore.bgMode === 'light'
                              ? AppStyle.MoreColors.OrangeMain
                              : AppStyle.MoreColors.BlueMain,
                        },
                      ]}>
                      {i18n.t('save')}
                    </Text>
                  </TouchableOpacity>
                )
              }
            />
          ) : textValue ? (
            <BaseHeader
              containerStyle={styles.header}
              rightElement={<Text style={styles.txtHeader}>Next</Text>}
              rightAction={() => {
                setInfo();
                navigation.navigate('NotiQuestion');
              }}
            />
          ) : (
            <BaseHeader
              containerStyle={styles.header}
              rightElement={<Text style={styles.txtHeader}>Next</Text>}
              rightAction={() => {}}
            />
          )}
          <View style={styles.wrapper1}>
            {checkNickName ? (
              <></>
            ) : (
              <View style={styles.boxTitle}>
                <Text style={styles.txtMain}>Nice to meet you!</Text>
                <Text style={styles.txtMain}>
                  What do your friends call you??
                </Text>
              </View>
            )}
            <View style={[styles.boxAvatar, {backgroundColor: activeColor}]}>
              <Image source={activeAvatar} style={[styles.avt_style]} />
            </View>
            <View
              style={[
                styles.boxTextInput,
                {
                  backgroundColor:
                    uiStore.bgMode === 'light'
                      ? AppStyle.BGColor.White
                      : AppStyle.BGColor.BGDarkMode,
                },
              ]}>
              <TextInput
                style={styles.textInput}
                placeholder={
                  checkNickName ? `${checkNickName}` : 'Your Nickname'
                }
                placeholderTextColor={
                  checkNickName
                    ? uiStore.bgMode === 'light'
                      ? AppStyle.BGColor.Black
                      : AppStyle.BGColor.White
                    : null
                }
                maxLength={22}
                value={textValue}
                onChangeText={setTextValue}
              />
            </View>
          </View>
          <View style={styles.wrapper2}>
            <View
              style={[
                styles.boxItemColor,
                {
                  backgroundColor:
                    uiStore.bgMode === 'light'
                      ? AppStyle.BGColor.White
                      : AppStyle.BGColor.BGDarkMode,
                },
              ]}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{paddingLeft: 10}}
                showsHorizontalScrollIndicator={false}>
                {dataList.map(item => {
                  return <ItemColor key={item.id} itemColor={item} />;
                })}
              </ScrollView>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={[
                  styles.boxItemAvatar,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.BGDarkMode,
                  },
                ]}>
                <FlatList
                  data={dataList}
                  horizontal={false}
                  numColumns={numColumns}
                  renderItem={({item}) => renderItem(item)}
                  extraData={activeAvatar}
                  keyExtractor={item => `avatar-${item.id}`}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      }
      uiStore={uiStore}
    />
  );
};
export default InfoUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f1fafc',
  },
  header: {
    // backgroundColor: '#f1fafc',
  },
  txtHeader: {
    fontSize: 16,
  },
  txtMain: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
  },
  wrapper1: {
    paddingTop: 20,
    alignItems: 'center',
  },
  wrapper2: {
    flex: 1,
    marginTop: 20,
  },
  boxTitle: {
    alignItems: 'center',
  },
  boxItemAvatar: {
    // flexWrap: 'wrap',
    flexDirection: 'row',
    width: AppStyle.Screen.FullWidth,
  },
  boxAvatar: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: AppStyle.Screen.FullWidth / 3,
    height: AppStyle.Screen.FullWidth / 3,
    borderRadius: AppStyle.Screen.FullWidth / 3,
  },

  avt_style: {
    width: AppStyle.Screen.FullWidth * 0.25,
    height: AppStyle.Screen.FullWidth * 0.25,
  },
  avt_item_style: {
    width: AppStyle.Screen.FullWidth * 0.13,
    height: AppStyle.Screen.FullWidth * 0.13,
  },
  boxTextInput: {
    width: AppStyle.Screen.FullWidth - 16,
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 18,
    fontWeight: '700',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  boxItemColor: {
    width: AppStyle.Screen.FullWidth,
    height: 80,
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: '#d8d8d8',
    alignItems: 'center',
  },
  borderItemColor: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  itemColor: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  itemAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F2F3',
    width: AppStyle.Screen.FullWidth * 0.19,
    height: AppStyle.Screen.FullWidth * 0.19,
    borderRadius: AppStyle.Screen.FullWidth * 0.1,
  },
  borderItemAvatar: {
    margin: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: AppStyle.Screen.FullWidth * 0.2,
    height: AppStyle.Screen.FullWidth * 0.2,
    borderRadius: AppStyle.Screen.FullWidth * 0.1,
  },
  headerStyle: {
    // backgroundColor: AppStyle.BGColor.White,
  },
  leftElementStyle: {
    width: 20,
    height: 20,
  },
  centerElementStyle: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  rightElementStyle: {
    fontSize: 16,
    color: '#f27d31',
    fontFamily: 'Quicksand-Bold',
  },
});
