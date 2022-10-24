import {NavigationProp, ParamListBase} from '@react-navigation/native';
import i18next from 'i18next';
import {observer} from 'mobx-react';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import challengeDataEn from '../../../assets/json/en/challenges.json';
import UIStore from '../../../shared/store/ui';
import UserStore from '../../../shared/store/user';
import BaseHeader from '../../../shared/ui/containers/base_header';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {
  bg_be_active,
  bg_be_little_crazy,
  bg_connect_others,
  bg_eat_healthy,
  bg_self_improvement,
  bg_self_relaxation,
  ic_close_orange,
  ic_one_time_task,
  ic_regular_habit,
} from '../../../utils/icons';

const images = {
  bg_eat_healthy,
  bg_self_relaxation,
  bg_be_active,
  bg_be_little_crazy,
  bg_connect_others,
  bg_self_improvement,
};

interface CreateChallengeScreenProps {
  uiStore: UIStore;
  userStore: UserStore;
  navigation: NavigationProp<ParamListBase>;
}

const CreateChallengeScreen = observer(
  ({uiStore, userStore, navigation}: CreateChallengeScreenProps) => {
    const ItemCategory = props => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChallengeDetailScreen', {
              challengeData: challengeDataEn[props.id - 1],
            })
          }
          style={styles.boxChooseItem}>
          <ImageBackground
            imageStyle={{borderRadius: 8}}
            source={images[props.image]}
            style={styles.bgItem}>
            <View style={styles.boxTxtItem}>
              <Text
                style={[
                  styles.txtItem,
                  {
                    color:
                      uiStore.bgMode === 'light'
                        ? AppStyle.MoreColors.Black
                        : AppStyle.MoreColors.White,
                  },
                ]}>
                {i18next.t(`challenges.${props.title}`)}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    };
    return (
      <MainView
        childView={
          <View style={styles.container}>
            <BaseHeader
              centerElement={
                <Text style={styles.txtCenterElement}>
                  {i18n.t('challenges.create')}
                </Text>
              }
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
                  source={ic_close_orange}
                />
              }
              leftAction={() => navigation.goBack()}
              containerStyle={styles.header}
            />
            <ScrollView
              style={styles.wrapperMain}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.txtTitleBox}>
                {i18n.t('challenges.create_your_own')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.boxCreate,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.BGDarkMode,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('NewChallenge');
                }}>
                <Image style={styles.iconCreate} source={ic_regular_habit} />
                <Text style={styles.txtBox}>
                  {i18n.t('challenges.regular_habit')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NewChallenge', {
                    randomTask: true,
                  });
                }}
                style={[
                  styles.boxCreate,
                  {
                    backgroundColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.BGColor.White
                        : AppStyle.BGColor.BGDarkMode,
                  },
                ]}>
                <Image style={styles.iconCreate} source={ic_one_time_task} />
                <Text style={styles.txtBox}>
                  {i18n.t('challenges.one_time_task')}
                </Text>
              </TouchableOpacity>

              <Text style={styles.txtTitleBox}>
                {i18n.t('challenges.or_choose_from_these_category')}
              </Text>
              <View style={styles.wrapperChooseItem}>
                {challengeDataEn.map(item => {
                  return (
                    <ItemCategory
                      key={item.id}
                      id={item.id}
                      title={item.image}
                      image={item.image}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        }
        uiStore={uiStore}
      />
    );
  },
);

export default CreateChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperMain: {
    marginHorizontal: 10,
  },
  header: {
    // backgroundColor: AppStyle.BGColor.White,
  },
  txtCenterElement: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  leftElementStyle: {
    width: 15,
    height: 15,
  },
  txtTitleBox: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  boxCreate: {
    padding: 12,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  iconCreate: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  txtBox: {
    fontSize: 15,
    marginLeft: 10,
  },
  wrapperChooseItem: {
    width: AppStyle.Screen.FullWidth - 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  boxChooseItem: {
    marginTop: 15,
    width: (AppStyle.Screen.FullWidth - 20) * 0.48,
    height: AppStyle.Screen.FullWidth * 0.56,
  },
  bgItem: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  boxTxtItem: {
    top: 10,
    left: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtItem: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#2a2d29',
    fontFamily: 'Quicksand-SemiBold',
  },
});
