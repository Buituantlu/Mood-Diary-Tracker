import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {toString} from 'lodash';
import {observer} from 'mobx-react';
import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import {
  heightFooter,
  heightHeader,
  heightStatusBar,
} from '../../../shared/ui/styles/common.style';
import i18n from '../../../utils/i18n';
import {
  IC_ADD_THIN,
  IC_RIGHT_ARROW_FLEX,
  IC_SCREEN_EMPTY_NORMAL,
} from '../../../utils/icons';
import BaseText from '../../calendar/component/text';
import CalendarStore from '../../calendar/store/calendar_store';
import ListChallenges from '../component/list_challenges';
import ChallengeStore from '../store/challenge_store';

interface ChallengeScreenProps {
  uiStore: UIStore;
  navigation: NavigationProp<ParamListBase>;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
  challengeStore: ChallengeStore;
}

const ChallengeScreen = observer(
  ({
    uiStore,
    navigation,
    challengeStore,
    calendarStore,
  }: ChallengeScreenProps) => {
    const [time, setTime] = React.useState(
      new Date(calendarStore.curDate).getTime(),
    );
    let customDatesStyles = [];
    for (let i = 0; i < 6; i++) {
      customDatesStyles.push({
        dateContainerStyle: {
          borderRadius: 50,
          borderColor:
            uiStore.bgMode == 'dark' ? AppStyle.BGColor.BlueSky : '#f47c33',
          borderWidth: 1,
          height: 80,
          width: AppStyle.Screen.FullWidth / 9,
        },
      });
    }
    const ListDay = [
      {day: i18n.t('monday'), date: 31},
      {day: i18n.t('tuesday'), date: 1},
      {day: i18n.t('wednesday'), date: 2},
      {day: i18n.t('thursday'), date: 3},
      {day: i18n.t('friday'), date: 4},
      {day: i18n.t('saturday'), date: 5},
      {day: i18n.t('sunday'), date: 6},
    ];
    const ItemDay = item => {
      return (
        <View style={styles.containerDay}>
          {ListDay.map((e, index) => {
            return (
              <TouchableOpacity key={index} style={styles.btnDay}>
                <BaseText
                  uiStore={uiStore}
                  style={styles.txtDay}
                  text={e.day}
                />
                <BaseText
                  uiStore={uiStore}
                  style={styles.txtDate}
                  text={toString(e.date)}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
    return (
      <MainView
        uiStore={uiStore}
        childView={
          <View style={styles.container}>
            <View>
              <CalendarStrip
                scrollerPaging
                style={styles.containerCalendar}
                calendarHeaderStyle={styles.txtMonth}
                dateNumberStyle={styles.txtDate}
                dateNameStyle={styles.txtDay}
                onDateSelected={date => {
                  let getDate = new Date(date).getTime();
                  setTime(getDate - 5 * 60 * 60 * 1000);
                }}
                highlightDateContainerStyle={{
                  width: AppStyle.Screen.FullWidth / 9,
                  backgroundColor:
                    uiStore.bgMode == 'dark'
                      ? AppStyle.BGColor.BlueSky
                      : '#f47c33',
                }}
                customDatesStyles={customDatesStyles}
                highlightDateNumberStyle={styles.txtDate}
                highlightDateNameStyle={styles.txtDay}
                iconLeftStyle={{
                  tintColor:
                    uiStore.bgMode == 'dark'
                      ? AppStyle.BGColor.White
                      : AppStyle.BGColor.GrayDark,
                }}
                iconRightStyle={{
                  tintColor:
                    uiStore.bgMode == 'dark'
                      ? AppStyle.BGColor.White
                      : AppStyle.BGColor.GrayDark,
                }}
                dayComponentHeight={80}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateChallenge')}
                style={styles.btnAdd}
                activeOpacity={0.1}>
                <Image
                  style={[
                    styles.icHeader,
                    {
                      tintColor:
                        uiStore.bgMode === 'dark'
                          ? AppStyle.MoreColors.BlueMain
                          : AppStyle.MoreColors.OrangeMain,
                    },
                  ]}
                  source={IC_ADD_THIN}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[
                {
                  backgroundColor:
                    uiStore.bgMode == 'dark'
                      ? AppStyle.BGColor.Main
                      : AppStyle.BGColor.WhiteLittle,
                },
                styles.containerList,
              ]}
              contentContainerStyle={{flexGrow: 1}}
              nestedScrollEnabled={true}>
              {challengeStore.arrChallenges.length > 0 ? (
                challengeStore.arrChallenges.map(item => {
                  if (item.startTime <= time && item.endTime >= time) {
                    return (
                      <ListChallenges
                        calendarStore={calendarStore}
                        navigation={navigation}
                        key={item.id}
                        item={item}
                        uiStore={uiStore}
                        challengeStore={challengeStore}
                        time={time}
                      />
                    );
                  }
                })
              ) : (
                <View style={styles.containerDream}>
                  <Image style={styles.imgRight} source={IC_RIGHT_ARROW_FLEX} />
                  <View style={styles.viewDream}>
                    <BaseText
                      uiStore={uiStore}
                      style={styles.txtSetUp}
                      text={i18n.t('challenges.set_up_a_goal_now')}
                    />
                    <Image
                      style={styles.imgDream}
                      source={IC_SCREEN_EMPTY_NORMAL}
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        }
      />
    );
  },
);

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    padding: 10,
    marginTop: 20,
    backgroundColor: 'lightgreen',
  },
  icHeader: {
    width: 25,
    height: 25,
    tintColor: AppStyle.BGColor.BlueSky,
  },
  txtHeader: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
  },
  btnDay: {
    width: AppStyle.Screen.FullWidth / 7,
    alignItems: 'center',
    height: 72,
  },
  txtDay: {
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
  },
  txtDate: {
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    marginTop: 10,
  },
  imgDream: {
    width: AppStyle.Screen.FullWidth / 2.3,
    height: AppStyle.Screen.FullWidth / 2.5,
    resizeMode: 'contain',
  },
  imgRight: {
    height: 150,
    resizeMode: 'contain',
    marginLeft: AppStyle.Screen.FullWidth / 2,
  },
  containerDream: {
    height: AppStyle.Screen.FullHeight / 2,
  },
  viewDream: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  txtSetUp: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
  },
  containerCalendar: {
    height: heightHeader + 90,
    width: '100%',
    zIndex: 0,
    paddingTop: heightStatusBar + 16,
    paddingBottom: 10,
  },
  txtMonth: {
    height: 40,
    width: AppStyle.Screen.FullWidth,
    fontSize: 20,
  },
  viewDate: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  dateNameStyle: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
  },
  dateNumberStyle: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 20,
    width: 40,
    height: 40,
  },
  containerList: {
    paddingTop: 10,
    flex: 1,
    paddingBottom: heightFooter + 58,
  },
  btnAdd: {
    position: 'absolute',
    right: 16,
    top: heightStatusBar + 16,
    zIndex: 1,
  },
});

//               rightAction={() => navigation.navigate('CreateChallenge')}
//               centerElement={
//                 <BaseText
//                   uiStore={uiStore}
//                   style={styles.txtHeader}
//                   text={i18next.t('challenges.today')}
//                 />
//               }
//             />
//             <ViewPager data={ListWeek} renderPage={ItemDay} />
// >>>>>>> Stashed changes
