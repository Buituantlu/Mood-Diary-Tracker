import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import UIStore from '../../../shared/store/ui';
import BaseHeader from '../../../shared/ui/containers/base_header';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import {ic_arrow_left_orange} from '../../../utils/icons';
import Swiper from 'react-native-swiper';
import i18n from '../../../utils/i18n';

interface WidgetHelpCenterScreenProps {
  uiStore: UIStore;
  navigation: any;
  rootNavigation: NavigationProp<ParamListBase>;
}

const WidgetHelpCenterScreen = ({
  uiStore,
  navigation,
  rootNavigation,
}: WidgetHelpCenterScreenProps) => {
  const widgetList = [
    {
      id: 0,
      description: i18n.t('detail_widget_1'),
      image: require('../../../assets/icons/img_widget_1.jpeg'),
    },
    {
      id: 1,
      description: i18n.t('detail_widget_2'),
      image: require('../../../assets/icons/img_widget_2.jpeg'),
    },
    {
      id: 2,
      description: i18n.t('detail_widget_3'),
      image: require('../../../assets/icons/img_widget_3.jpeg'),
    },
    {
      id: 3,
      description: i18n.t('detail_widget_4'),
      image: require('../../../assets/icons/img_widget_4.jpeg'),
    },
  ];

  const WidgetItem = props => {
    return (
      <View style={styles.wrapperSwiper}>
        <Image style={styles.imgSwiper} source={props.image} />
        <Text style={styles.txtDescription}>{props.description}</Text>
      </View>
    );
  };

  return (
    <MainView
      childView={
        <View style={styles.container}>
          <BaseHeader
            containerStyle={styles.header}
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
              <Text style={styles.centerElementStyle}>Widget Help Center</Text>
            }
          />
          <SafeAreaView style={styles.container}>
            <Text style={styles.txtTitle}>{i18n.t('title_widget')}</Text>
            <Swiper
              paginationStyle={styles.paginationStyle}
              activeDotColor={
                uiStore.bgMode === 'light'
                  ? AppStyle.MoreColors.OrangeMain
                  : AppStyle.MoreColors.BlueMain
              }>
              {widgetList.map(item => {
                return (
                  <WidgetItem
                    key={item.id}
                    description={item.description}
                    image={item.image}
                  />
                );
              })}
            </Swiper>
          </SafeAreaView>
        </View>
      }
      uiStore={uiStore}
    />
  );
};

export default WidgetHelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#f9f7f3',
  },
  header: {
    // backgroundColor: '#FFF',
  },
  leftElementStyle: {
    width: 20,
    height: 20,
  },
  centerElementStyle: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  txtTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '500',
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  txtDescription: {
    height: 50,
    fontSize: 16,
    textAlign: 'center',
    width: AppStyle.Screen.FullWidth * 0.9,
  },
  paginationStyle: {
    position: 'absolute',
    top: -AppStyle.Screen.FullHeight * 0.75,
  },
  wrapperSwiper: {
    bottom: 30,
    position: 'absolute',
    alignItems: 'center',
    width: AppStyle.Screen.FullWidth,
  },
  imgSwiper: {
    resizeMode: 'contain',
    width: AppStyle.Screen.FullWidth * 0.65,
    height: AppStyle.Screen.FullHeight * 0.65,
  },
});
