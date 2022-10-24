import {Image, View} from 'react-native';
import React from 'react';
import BaseHeader from '../../../shared/ui/containers/base_header';
import {
  IC_DOWN_ARROW_NORMAL,
  IC_NAVIGATION_CALENDAR,
  IC_NAVIGATION_CALENDAR_HIDE,
  IC_SCREEN_EMPTY_NORMAL,
} from '../../../utils/icons';
import styles from '../component/styles';
import HeaderCalendar from '../../../shared/ui/components/header_calendar';
import CalendarStore from '../store/calendar_store';
import ListMoodFollowMonth from './list_mood_follow_month';
import {observer} from 'mobx-react';
import MoodStore from '../../../shared/store/moodStore';
import AppStyle from '../../../shared/ui/styles/app.style';
import UIStore from '../../../shared/store/ui';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';

interface ListMoodMonthScreenProps {
  onChangeScreen: () => void;
  nextMonth: () => void;
  backMonth: () => void;
  calendarStore: CalendarStore;
  moodStore: MoodStore;
  uiStore: UIStore;
  rootNavigation: NavigationProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}

const ListMoodMonthScreen = observer(
  ({
    uiStore,
    onChangeScreen,
    nextMonth,
    backMonth,
    calendarStore,
    moodStore,
    rootNavigation,
    navigation,
  }: ListMoodMonthScreenProps) => {
    const checkYear = () => {
      if (CommonFn.y(calendarStore.curYearMonth) == calendarStore.curYear) {
        return `Tháng ${calendarStore.curMonth}`;
      } else {
        return `${calendarStore.curYearMonth}`;
      }
    };
    return (
      <View style={styles.container}>
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
              source={IC_NAVIGATION_CALENDAR}
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
        <View style={styles.containerListMonth}>
          {moodStore.arrMoodsFollowMonth.length !== 0 ? (
            <ListMoodFollowMonth
              uiStore={uiStore}
              calendarStore={calendarStore}
              moodStore={moodStore}
              rootNavigation={rootNavigation}
              navigation={navigation}
            />
          ) : (
            <View style={styles.containerImg}>
              <Image style={styles.imgDream} source={IC_SCREEN_EMPTY_NORMAL} />
              <Image style={styles.imgDownload} source={IC_DOWN_ARROW_NORMAL} />
            </View>
          )}
        </View>
      </View>
    );
  },
);

export default ListMoodMonthScreen;
