import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import ListMood from '../../../shared/ui/containers/list_moods/main';
import MoodStore, {SAVE_MOODS} from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import BaseText from '../component/text';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import CalendarStore from '../store/calendar_store';
import UserStore from '../../../shared/store/user';
import i18n from '../../../utils/i18n';
import {reaction} from 'mobx';
import {saveObjectDataLocal} from '../../../services/storage';

interface CreMoodCalendarProps {
  moodStore: MoodStore;
  uiStore: UIStore;
  userStore: UserStore;
  rootNavigation: NavigationProp<ParamListBase>;
  calendarStore: CalendarStore;
  navigation: NavigationProp<ParamListBase>;
}

const CreMoodCalendar = observer(
  ({
    moodStore,
    uiStore,
    userStore,
    calendarStore,
    navigation,
  }: CreMoodCalendarProps) => {
    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );
    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);

    let getDate = new Date();
    const onSave = () => {
      moodStore.createMood({
        id: new Date().getTime(),
        inputName: moodStore.getNameFollowId(moodStore.isSelect - 1),
        moodType: moodStore.getTypeFollowId(moodStore.isSelect - 1),
        createTime:
          new Date(calendarStore.curDate).getTime() +
          (getDate.getHours() * 3600 * 1000 +
            getDate.getMinutes() * 60 * 1000) -
          7 * 3600 * 1000,
      });
      saveObjectDataLocal(SAVE_MOODS, moodStore.arrMoods);
      const arrMods = moodStore.getMoodsFollowDate(
        new Date(calendarStore.curDate).getTime(),
      );
      moodStore.setArrMoodDay(arrMods);
    };

    const onAddDetail = () => {
      navigation.navigate('CenterTabBar', {
        screen: 'AddMoodDetail',
        params: {
          moodType: moodStore.getTypeFollowId(moodStore.isSelect - 1),
          createTimeMood:
            new Date(calendarStore.curDate).getTime() +
            (getDate.getHours() * 3600 * 1000 +
              getDate.getMinutes() * 60 * 1000) -
            7 * 3600 * 1000,
        },
      });
    };
    return (
      <View style={styles.contentFooter}>
        <BaseText
          uiStore={uiStore}
          style={styles.txtHelloUser}
          text={`${i18n.t('calendar.hello')}, ${
            userStore.user.nickname
          }! \n ${i18n.t('calendar.how_are_you_feeling')}`}
        />
        <ListMood moodStore={moodStore} />
        <View
          style={[
            styles.containerBtn,
            {opacity: moodStore.isSelect !== 0 ? 1 : 0.8},
          ]}>
          {moodStore.isSelect ? (
            <TouchableOpacity
              onPress={onSave}
              style={[
                styles.btnSave,
                {
                  borderColor:
                    uiStore.bgMode === 'light'
                      ? AppStyle.BgMood.Meh
                      : AppStyle.BGColor.BlueSky,
                  borderWidth: 1,
                },
              ]}>
              <BaseText
                uiStore={uiStore}
                style={styles.txtSave}
                text={i18n.t('calendar.save')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.btnSave,
                {
                  borderColor:
                    uiStore.bgMode === 'light'
                      ? AppStyle.BgMood.Meh
                      : AppStyle.BGColor.BlueSky,
                  borderWidth: 1,
                },
              ]}>
              <BaseText
                uiStore={uiStore}
                style={styles.txtSave}
                text={i18n.t('calendar.save')}
              />
            </TouchableOpacity>
          )}

          <View style={{opacity: moodStore.isSelect !== 0 ? 1 : 0.8}}>
            {moodStore.isSelect ? (
              <TouchableOpacity
                onPress={onAddDetail}
                style={[
                  styles.btnSave,
                  {backgroundColor: AppStyle.BGColor.BlueSky},
                ]}>
                <Text style={[styles.txtSave, {color: 'white'}]}>
                  {i18n.t('calendar.add_detail')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnSave,
                  {backgroundColor: AppStyle.BGColor.BlueSky},
                ]}>
                <Text style={[styles.txtSave, {color: 'white'}]}>
                  {i18n.t('calendar.add_detail')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  },
);

export default CreMoodCalendar;

const styles = StyleSheet.create({
  btnSave: {
    height: 24,
    width: AppStyle.Screen.FullWidth / 4,
    borderRadius: 20,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSave: {
    fontSize: 12,
    fontFamily: 'Quicksand-SemiBold',
  },
  contentFooter: {
    borderRadius: 15,
    marginHorizontal: 4,
    borderColor: '#85929E',
    borderWidth: 0.3,
    alignItems: 'center',
    marginTop: 5,
  },
  txtHelloUser: {
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',
    paddingTop: 8,
    marginBottom: 20,
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: AppStyle.Screen.FullWidth / 1.8,
    marginTop: 16,
    paddingBottom: 16,
  },
});
