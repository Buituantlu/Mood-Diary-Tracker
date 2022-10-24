import {Image, View} from 'react-native';
import React from 'react';
import BaseHeader from '../../../shared/ui/containers/base_header';
import {
  IC_NAVIGATION_CALENDAR,
  IC_NAVIGATION_CALENDAR_HIDE,
} from '../../../utils/icons';
import HeaderCalendar from '../../../shared/ui/components/header_calendar';
import CalendarStore from '../store/calendar_store';
import {ScrollView} from 'react-native-gesture-handler';
import MoodStore from '../../../shared/store/moodStore';
import {observer} from 'mobx-react';
import styles from '../component/styles';
import CreMoodCalendar from './cre_mood_calendar';
import Calendar from '../../../shared/ui/containers/calender';
import ListMoodFollowDay from './list_mood_follow_day';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import BaseText from '../component/text';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import UserStore from '../../../shared/store/user';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';

interface CalendarScreenProps {
  onChangeScreen: () => void;
  nextMonth: () => void;
  backMonth: () => void;
  calendarStore: CalendarStore;
  moodStore: MoodStore;
  onChangeDate: (date: any) => void;
  renderChildDay: (day: number) => void;
  uiStore: UIStore;
  userStore: UserStore;
  rootNavigation: NavigationProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const CalendarScreen = observer(
  ({
    onChangeScreen,
    nextMonth,
    backMonth,
    calendarStore,
    moodStore,
    onChangeDate,
    renderChildDay,
    uiStore,
    userStore,
    rootNavigation,
    navigation,
  }: CalendarScreenProps) => {
    const checkYear = () => {
      if (CommonFn.y(calendarStore.curYearMonth) == calendarStore.curYear) {
        return `Tháng ${calendarStore.curMonth}`;
      } else {
        return `${calendarStore.curYearMonth}`;
      }
    };
    return (
      <View style={[styles.container]}>
        <BaseHeader
          rightAction={onChangeScreen}
          rightElement={
            <Image
              style={[
                styles.icHeader,
                {
                  tintColor:
                    uiStore.bgMode === 'dark'
                      ? AppStyle.BGColor.BlueSky
                      : AppStyle.BgMood.Meh,
                },
              ]}
              source={IC_NAVIGATION_CALENDAR_HIDE}
            />
          }
          centerElement={
            <HeaderCalendar
              uiStore={uiStore}
              calendarStore={calendarStore}
              nextMonth={nextMonth}
              backMonth={backMonth}
              title={checkYear()}
            />
          }
        />
        <Calendar
          uiStore={uiStore}
          moodStore={moodStore}
          calendarChangeDate={date => calendarStore.changeDate(date)}
          changeDate={date => onChangeDate(date)}
          fotmat="YYYY-MM-DD"
          renderChildDay={day => renderChildDay(day)}
          calendarStore={calendarStore}
        />
        <View style={styles.containerDay}>
          <View style={styles.containerDays}>
            <BaseText
              uiStore={uiStore}
              style={styles.txtDay}
              text={calendarStore.getDayInMonth(calendarStore.curDate) + ', '}
            />
            <BaseText
              uiStore={uiStore}
              style={styles.txtDay}
              text={calendarStore.curDate}
            />
          </View>
          <ScrollView
            style={{flexGrow: 1}}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            {moodStore.arrMoodDay.length == 0 ? (
              <CreMoodCalendar
                rootNavigation={rootNavigation}
                navigation={navigation}
                uiStore={uiStore}
                userStore={userStore}
                moodStore={moodStore}
                calendarStore={calendarStore}
              />
            ) : (
              <>
                {moodStore.arrMoodDay.map(day => {
                  return (
                    <ListMoodFollowDay
                      uiStore={uiStore}
                      key={day.id.toString()}
                      listDay={day}
                      moodStore={moodStore}
                      navigation={navigation}
                    />
                  );
                })}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    );
  },
);

export default CalendarScreen;
