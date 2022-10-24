import {observer} from 'mobx-react';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Dash from 'react-native-dash';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import BaseText from '../../calendar/component/text';
import CalendarStore from '../../calendar/store/calendar_store';

interface AverageDailyMoodProps {
  moodStore: MoodStore;
  calendarStore: CalendarStore;
  uiStore: UIStore;
}

const AverageDailyMood = observer(
  ({moodStore, calendarStore, uiStore}: AverageDailyMoodProps) => {
    const Day = [
      {id: 1, name: i18n.t('monday'), style: styles.txtTh23},
      {id: 2, name: i18n.t('tuesday'), style: styles.txtTh23},
      {id: 3, name: i18n.t('wednesday'), style: styles.txtTh45},
      {id: 4, name: i18n.t('thursday'), style: styles.txtTh45},
      {id: 5, name: i18n.t('friday'), style: styles.txtTh67Cn},
      {id: 6, name: i18n.t('saturday'), style: styles.txtTh67Cn},
      {id: 0, name: i18n.t('sunday'), style: styles.txtTh67Cn},
    ];
    const ItemDay = observer(({day, style, id}) => {
      return (
        <View style={styles.containerItem}>
          <View style={styles.column}>
            <Text style={style}>{day}</Text>
            {moodStore.Average &&
              moodStore.Average.map((e, index) => {
                return (
                  <View key={index}>
                    {e.day == id
                      ? e.data.map((mood, idx) => {
                          return (
                            <Image
                              key={idx}
                              style={styles.iconMood}
                              source={moodStore.getImageFollowType(
                                mood.moodType,
                              )}
                            />
                          );
                        })
                      : null}
                  </View>
                );
              })}
          </View>
          {day !== i18n.t('sunday') && (
            <Dash
              style={[
                styles.dashLine,
                {opacity: uiStore.bgMode == 'dark' ? 1.4 : 0.2},
              ]}
              dashColor={
                uiStore.bgMode == 'dark'
                  ? AppStyle.BGColor.White
                  : AppStyle.BGColor.GrayDark
              }
              dashLength={8}
              dashThickness={1}
              dashGap={4}
            />
          )}
        </View>
      );
    });
    return (
      <View>
        <View
          style={[
            styles.boxTitleItem,
            {
              backgroundColor:
                uiStore.bgMode === 'light'
                  ? AppStyle.BGColor.White
                  : AppStyle.BGColor.GrayDark,
            },
          ]}>
          <BaseText
            uiStore={uiStore}
            style={styles.txtHeader}
            text={i18n.t('statistic.average_daily_mood')}
          />
        </View>
        <View
          style={[
            styles.dailyMood,
            {
              backgroundColor:
                uiStore.bgMode === 'light'
                  ? AppStyle.BGColor.White
                  : AppStyle.BGColor.GrayDark,
            },
          ]}>
          {Day.map(e => {
            return (
              <ItemDay key={e.id} id={e.id} day={e.name} style={e.style} />
            );
          })}
        </View>
      </View>
    );
  },
);

export default AverageDailyMood;

const styles = StyleSheet.create({
  boxTitleItem: {
    marginTop: 10,
    marginBottom: 3,
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 8,
  },
  txtHeader: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
  },
  dailyMood: {
    width: AppStyle.Screen.FullWidth - 16,
    height: 270,
    borderRadius: 10,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtTh23: {
    color: '#0090ff',
    fontFamily: 'Quicksand-Medium',
    paddingTop: 4,
  },
  txtTh45: {
    color: '#9f9fa3',
    fontFamily: 'Quicksand-Medium',
    paddingTop: 4,
  },
  txtTh67Cn: {
    color: '#f9a35b',
    fontFamily: 'Quicksand-Medium',
    paddingTop: 4,
  },
  column: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    width: (AppStyle.Screen.FullWidth - 16) / 7,
  },
  iconMood: {
    height: 40,
    resizeMode: 'contain',
    marginVertical: 4,
  },
  dashLine: {
    height: '90%',
    flexDirection: 'column',
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
