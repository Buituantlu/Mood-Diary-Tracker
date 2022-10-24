import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UIStore from '../../../shared/store/ui';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import BaseHeader from '../../../shared/ui/containers/base_header';
import AppStyle from '../../../shared/ui/styles/app.style';
import {ic_arrow_left_orange, IC_TICK_REPEAT} from '../../../utils/icons';
import {observer} from 'mobx-react';
import MainView from '../../../shared/ui/containers/main_view';
import i18n from '../../../utils/i18n';

interface RepeatProps {
  uiStore: UIStore;
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const Repeat = observer(({uiStore, navigation, route}: RepeatProps) => {
  const [type, setType] = useState('Every Day');
  const data = [
    {id: 1, type: 'never'},
    {id: 2, type: 'every_day'},
    {id: 3, type: 'every_week'},
    {id: 4, type: 'every_month'},
    {id: 5, type: 'every_year'},
  ];

  useEffect(() => {
    setType(route.params.type);
  }, []);
  return (
    <MainView
      uiStore={uiStore}
      childView={
        <View style={[styles.container]}>
          <BaseHeader
            centerElement={
              <Text style={styles.txtCenterElement}>
                {i18n.t('challenges.repeat')}
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
                source={ic_arrow_left_orange}
              />
            }
            leftAction={() =>
              navigation.navigate('NewChallenge', {
                type: type,
              })
            }
          />

          <View>
            <View
              style={[
                styles.box,
                {
                  backgroundColor:
                    uiStore.bgMode == 'dark'
                      ? AppStyle.BGColor.GrayDark
                      : AppStyle.BGColor.White,
                },
              ]}>
              {data.map(e => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setType(e.type);
                    }}
                    key={e.id}
                    style={styles.button}>
                    <View style={styles.content}>
                      <Text style={styles.txt}>
                        {i18n.t(`challenges.${e.type}`)}
                      </Text>
                      {type == e.type && (
                        <Image
                          style={styles.iconTick}
                          source={IC_TICK_REPEAT}
                        />
                      )}
                    </View>
                    {e.id !== 5 && (
                      <View
                        style={[
                          styles.line,
                          {
                            backgroundColor:
                              uiStore.bgMode == 'dark'
                                ? '#FFF'
                                : AppStyle.BGColor.GrayDark,
                            opacity: uiStore.bgMode == 'dark' ? 0.8 : 0.2,
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      }
    />
  );
});

export default Repeat;

const styles = StyleSheet.create({
  txtCenterElement: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  leftElementStyle: {
    width: 15,
    height: 15,
  },
  box: {
    height: 250,
    width: AppStyle.Screen.FullWidth - 16,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  button: {
    height: 50,
    paddingLeft: 10,
  },
  content: {
    flexDirection: 'row',
    height: 49,
    alignItems: 'center',
  },
  iconTick: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  line: {
    height: 1,
    width: AppStyle.Screen.FullWidth - 26,
  },
  txt: {
    flex: 1,
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  },
});
