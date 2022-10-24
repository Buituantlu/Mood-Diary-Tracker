import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {observer} from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import {Image} from 'react-native';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import UserStore from '../../../shared/store/user';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';
import MainView from '../../../shared/ui/containers/main_view';
import styles from '../component/styles';
import CalendarStore from '../store/calendar_store';
import CalendarScreen from './calendar_screen';
import ListMoodMonthScreen from './list_mood_month_screen';

interface ScheduleScreenProps {
  moodStore: MoodStore;
  calendarStore: CalendarStore;
  uiStore: UIStore;
  userStore: UserStore;
  rootNavigation: NavigationProp<ParamListBase>;
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const ScheduleScreen = observer(
  ({
    uiStore,
    userStore,
    rootNavigation,
    calendarStore,
    moodStore,
    route,
    navigation,
  }: ScheduleScreenProps) => {
    const onChangeDate = date => {
      const timeStampDay = new Date(date).getTime();
      const arrMods = moodStore.getMoodsFollowDate(timeStampDay);
      moodStore.setArrMoodDay(arrMods);
    };
    const onChangeScreen = () => {
      calendarStore.changeScreen();
      moodStore.arrMoodsFollowMonth.splice(0);
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
      calendarStore.limitMonth();
      const arrMods = moodStore.getMoodsFollowDate(
        new Date(calendarStore.curDay).getTime(),
      );
      moodStore.setArrMoodDay(arrMods);
    };

    const renderChildDay = day => {
      const timestampDate = new Date(day).getTime();
      const arrMoods = moodStore.getMoodsFollowDate(timestampDate);
      if (arrMoods.length > 0) {
        return (
          <Image
            source={moodStore.getImageFollowType(arrMoods[0].moodType)}
            style={styles.icMood}
          />
        );
      }
    };

    const nextMonth = () => {
      moodStore.arrMoodsFollowMonth.splice(0);
      calendarStore.changeYearMonth(
        moment(calendarStore.curYearMonth).add(1, 'month').format('YYYY-MM'),
      );
      calendarStore.changeMonth(Number(calendarStore.curMonth) + 1);
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
    };

    const backMonth = () => {
      moodStore.arrMoodsFollowMonth.splice(0);
      calendarStore.changeYearMonth(
        moment(calendarStore.curYearMonth).add(-1, 'month').format('YYYY-MM'),
      );
      calendarStore.changeMonth(Number(calendarStore.curMonth) - 1);
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
    };

    switch (CommonFn.day(calendarStore.curDate)) {
      case 0:
        calendarStore.changeDay('Chủ Nhật');
        break;
      case 1:
        calendarStore.changeDay('Thứ Hai');
        break;
      case 2:
        calendarStore.changeDay('Thứ Ba');
        break;
      case 3:
        calendarStore.changeDay('Thứ Tư');
        break;
      case 4:
        calendarStore.changeDay('Thứ Năm');
        break;
      case 5:
        calendarStore.changeDay('Thứ Sáu');
        break;
      case 6:
        calendarStore.changeDay('Thứ Bảy');
        break;
      default:
        calendarStore.changeDay('');
    }

    return (
      <MainView
        childView={
          <>
            {calendarStore.changeCalendar ? (
              <CalendarScreen
                rootNavigation={rootNavigation}
                navigation={navigation}
                onChangeScreen={onChangeScreen}
                nextMonth={nextMonth}
                backMonth={backMonth}
                calendarStore={calendarStore}
                moodStore={moodStore}
                onChangeDate={onChangeDate}
                renderChildDay={renderChildDay}
                uiStore={uiStore}
                userStore={userStore}
                route={route}
              />
            ) : (
              <ListMoodMonthScreen
                uiStore={uiStore}
                onChangeScreen={onChangeScreen}
                nextMonth={nextMonth}
                backMonth={backMonth}
                calendarStore={calendarStore}
                moodStore={moodStore}
                rootNavigation={rootNavigation}
                navigation={navigation}
              />
            )}
          </>
        }
        uiStore={uiStore}
      />
    );
  },
);

export default ScheduleScreen;
