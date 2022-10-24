import {NavigationProp, ParamListBase} from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import MainView from '../../../shared/ui/containers/main_view';
import MoodCount from './mood_count';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import UserStore from '../../../shared/store/user';
import HeaderCalendar from '../../../shared/ui/components/header_calendar';
import BaseHeader from '../../../shared/ui/containers/base_header';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';
import AppStyle from '../../../shared/ui/styles/app.style';
import {IC_SLIDERS} from '../../../utils/icons';
import CalendarStore from '../../calendar/store/calendar_store';
import {observer} from 'mobx-react';
import OftenTogether from './often_together';
import MonthLyMoodChart from './monthly_mood_chart';
import AverageDailyMood from './average_daily_mood';
import ActivityCount from './activity_count';
import {reaction} from 'mobx';
import i18n from '../../../utils/i18n';
import {useEffect} from 'react';

interface StatisticScreenProps {
  uiStore: UIStore;
  userStore: UserStore;
  rootNavigation: NavigationProp<ParamListBase>;
  calendarStore: CalendarStore;
  moodStore: MoodStore;
}

const StatisticScreen = observer(
  ({
    uiStore,
    userStore,
    moodStore,
    calendarStore,
    rootNavigation,
  }: StatisticScreenProps) => {
    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );
    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);
    const nextMonth = () => {
      moodStore.removeArrAverage();
      moodStore.arrMoodsFollowMonth.splice(0);
      moodStore.removeArrMonthly();
      calendarStore.changeYearMonth(
        moment(calendarStore.curYearMonth).add(1, 'month').format('YYYY-MM'),
      );
      calendarStore.changeMonth(Number(calendarStore.curMonth) + 1);
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
      moodStore.arrMoodsFollowMonth.forEach(e => {
        let getTime = new Date(e.time);
        let getDay = getTime.getDate();
        let getId = moodStore.getIdFollowTypeRevert(e.data[0].moodType);
        moodStore.addMonthly({x: getDay, y: getId});
      });
      moodStore.MonthLy.sort((a, b) => a.x - b.x);
      moodStore.getMoodDayFollowMonth();
    };

    const backMonth = () => {
      moodStore.removeArrAverage();
      moodStore.arrMoodsFollowMonth.splice(0);
      moodStore.removeArrMonthly();
      calendarStore.changeYearMonth(
        moment(calendarStore.curYearMonth).add(-1, 'month').format('YYYY-MM'),
      );
      calendarStore.changeMonth(Number(calendarStore.curMonth) - 1);
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
      moodStore.arrMoodsFollowMonth.forEach(e => {
        let getTime = new Date(e.time);
        let getDay = getTime.getDate();
        let getId = moodStore.getIdFollowTypeRevert(e.data[0].moodType);
        moodStore.addMonthly({x: getDay, y: getId});
      });
      moodStore.MonthLy.sort((a, b) => a.x - b.x);
      moodStore.getMoodDayFollowMonth();
    };

    const checkYear = () => {
      if (CommonFn.y(calendarStore.curYearMonth) == calendarStore.curYear) {
        return `Tháng ${calendarStore.curMonth}`;
      } else {
        return `${calendarStore.curYearMonth}`;
      }
    };

    return (
      <MainView
        childView={
          <View style={[styles.container]}>
            <BaseHeader
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
                  source={IC_SLIDERS}
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
            <ScrollView
              nestedScrollEnabled={true}
              style={styles.wrapper}
              showsVerticalScrollIndicator={false}>
              <MonthLyMoodChart
                uiStore={uiStore}
                moodStore={moodStore}
                calendarStore={calendarStore}
              />
              <AverageDailyMood
                uiStore={uiStore}
                moodStore={moodStore}
                calendarStore={calendarStore}
              />
              <MoodCount
                uiStore={uiStore}
                moodStore={moodStore}
                calendarStore={calendarStore}
              />
              <OftenTogether
                uiStore={uiStore}
                calendarStore={calendarStore}
                moodStore={moodStore}
              />
              <ActivityCount
                uiStore={uiStore}
                calendarStore={calendarStore}
                moodStore={moodStore}
              />
              <View style={styles.footerStyle} />
            </ScrollView>
          </View>
        }
        uiStore={uiStore}
      />
    );
  },
);
export default StatisticScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingBottom: AppStyle.Screen.FullHeight * 0.15,
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  icHeader: {
    width: 25,
    height: 25,
    tintColor: AppStyle.BGColor.BlueSky,
  },
  footerStyle: {height: 100},
});
