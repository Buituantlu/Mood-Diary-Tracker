import React, {useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import * as CommonFn from './commonFn';
import styles from './styles/calendar_select_styles';
import _ from 'lodash';
import GestureRecognizer from 'react-native-swipe-gestures';
import {observer} from 'mobx-react';
import CalendarStore from '../../../../modules/calendar/store/calendar_store';
import MoodStore from '../../../store/moodStore';
import AppStyle from '../../styles/app.style';
import {IC_TRIANGLE} from '../../../../utils/icons';
import UIStore from '../../../store/ui';

interface CalendarSelectProps {
  calendarStore: CalendarStore;
  calendarChange: (tipe: any, inut: any) => void;
  calendarMonth: any;
  date: number | string;
  renderChildDay: any;
  selectDate: (date: any) => void;
  moodStore: MoodStore;
  uiStore: UIStore;
}

const CalendarSelect = observer(
  ({
    calendarStore,
    calendarChange,
    calendarMonth,
    date,
    renderChildDay,
    selectDate,
    moodStore,
    uiStore,
  }: CalendarSelectProps) => {
    let stySaturday = false;
    let stySunday = false;
    const [viewMode, setViewMode] = useState('day');
    const yearMonthChange = (type: number, unit: any) => {
      if (viewMode === 'day') {
        calendarChange(type, unit);
      }
    };
    let {arrMoods} = moodStore;
    const renderDay = (day: string) => {
      const isCurrentMonth = calendarMonth === CommonFn.ym();
      const isCurrent = isCurrentMonth && CommonFn.ymd() === day;
      const dateSelected = date && CommonFn.ymd(date) === day;
      const notCurrentMonth = day.indexOf(calendarMonth) !== 0;
      const arrMoods = moodStore.getMoodsFollowDate(new Date(day).getTime());
      if (new Date(day).getDay() == 6) {
        stySaturday = true;
      } else if (new Date(day).getDay() == 0) {
        stySunday = true;
      } else {
        stySaturday = false;
        stySunday = false;
      }

      return (
        <TouchableOpacity
          onPress={() => selectDate(day)}
          style={[
            styles.warpDay,
            dateSelected
              ? {
                  borderColor:
                    uiStore.bgMode === 'light'
                      ? '#f5ad6e'
                      : AppStyle.BGColor.BlueSky,
                  borderWidth: 2,
                }
              : {},
            isCurrent
              ? {
                  backgroundColor:
                    uiStore.bgMode === 'dark'
                      ? AppStyle.BGColor.GrayDark
                      : AppStyle.BGColor.OrangeLittle,
                }
              : {},
          ]}>
          <Text
            style={[
              styles.day,
              {
                color:
                  uiStore.bgMode === 'light'
                    ? AppStyle.TextColor.Black
                    : AppStyle.TextColor.White,
              },
              isCurrent
                ? {
                    backgroundColor:
                      uiStore.bgMode === 'dark'
                        ? AppStyle.TextColor.BlueSky
                        : '#f5ad6e',
                    color: AppStyle.TextColor.White,
                  }
                : {},
              notCurrentMonth ? {color: '#999999', opacity: 0.5} : {},
              stySaturday ? {color: AppStyle.TextColor.BlueSky} : {},
              stySunday ? {color: AppStyle.TextColor.RedPink} : {},
            ]}>
            {parseInt(day.split('-')[2], 10)}
          </Text>
          <View style={styles.containerDay}>
            <View style={{paddingBottom: 8}}>{renderChildDay(day)}</View>
            {arrMoods.length == 0 || arrMoods.length == 1 ? null : (
              <View style={styles.countMood}>
                <Text style={styles.txtCount}>+{arrMoods.length - 1}</Text>
                <Image style={styles.triangle} source={IC_TRIANGLE} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    };

    const onSwipeLeft = () => {
      if (calendarStore.limitMonth()) {
        return null;
      } else {
        yearMonthChange(1, 'month');
        calendarStore.changeMonth(Number(calendarStore.curMonth) + 1);
      }
    };

    const onSwipeRight = () => {
      yearMonthChange(-1, 'month');
      calendarStore.changeMonth(Number(calendarStore.curMonth) - 1);
    };
    const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const data = CommonFn.calendarArray(calendarMonth);
    let dayOfWeek: any = [];
    weekdays.forEach((element, index) => {
      dayOfWeek.push(
        <View key={index} style={styles.txt}>
          <Text
            style={[
              styles.weekdays,
              {
                color:
                  uiStore.bgMode === 'dark'
                    ? AppStyle.TextColor.White
                    : AppStyle.TextColor.Black,
              },
            ]}>
            {element}
          </Text>
        </View>,
      );
    });
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <View style={styles.containerCalendar}>
        <View style={styles.txtWeeks}>{dayOfWeek}</View>
        <GestureRecognizer
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          config={config}>
          <View>
            <FlatList
              data={data}
              keyExtractor={item => item}
              renderItem={({item}) => renderDay(item)}
              numColumns={7}
            />
          </View>
        </GestureRecognizer>
      </View>
    );
  },
);

export default CalendarSelect;
