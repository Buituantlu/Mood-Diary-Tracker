import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {isTablet} from 'react-native-device-info';
import CalendarNavigator from '../modules/calendar/calendar_navigator';
import CalendarStore from '../modules/calendar/store/calendar_store';
import ChallengeNavigator from '../modules/challenge/challenge_navigator';
import SettingNavigator from '../modules/settings/setting_navigator';
import StatisticNavigator from '../modules/statistic/static_navigator';
import MoodStore from '../shared/store/moodStore';
import UIStore from '../shared/store/ui';
import UserStore from '../shared/store/user';
import AppStyle from '../shared/ui/styles/app.style';
import {heightFooter} from '../shared/ui/styles/common.style';
import {
  IC_TABBAR_ADD,
  IC_TABBAR_ADD_BLUE,
  IC_TABBAR_CALENDAR,
  IC_TABBAR_CHALLENGE,
  IC_TABBAR_SETTINGS,
  IC_TABBAR_STATISTIC,
} from '../utils/icons';
import * as CommonFn from '../shared/ui/containers/calender/commonFn';
import ChallengeStore from '../modules/challenge/store/challenge_store';
import i18n from '../utils/i18n';
import {reaction} from 'mobx';

type BottomTabbarProps = {
  rootNavigation: NavigationProp<ParamListBase>;
  uiStore: UIStore;
  userStore: UserStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
  challengeStore: ChallengeStore;
};
const Tab = createBottomTabNavigator();

const BottomTabbar: React.FC<BottomTabbarProps> = observer(
  ({
    rootNavigation,
    uiStore,
    userStore,
    moodStore,
    calendarStore,
    challengeStore,
  }: BottomTabbarProps) => {
    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );

    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);
    const _renderIcon = (routeName: string, selectedTab: string) => {
      let icon: ImageSourcePropType | undefined = undefined;
      switch (routeName) {
        case 'Calendar':
          icon = IC_TABBAR_CALENDAR;
          break;
        case 'Lịch':
          icon = IC_TABBAR_CALENDAR;
          break;
        case 'Statistic':
          icon = IC_TABBAR_STATISTIC;
          break;
        case 'Thống kê':
          icon = IC_TABBAR_STATISTIC;
          break;
        case 'Challenges':
          icon = IC_TABBAR_CHALLENGE;
          break;
        case 'Thách thức':
          icon = IC_TABBAR_CHALLENGE;
          break;
        case 'Settings':
          icon = IC_TABBAR_SETTINGS;
          break;
        case 'Cài đặt':
          icon = IC_TABBAR_SETTINGS;
          break;
        default:
          break;
      }

      return (
        <View style={styles.itemTabbar}>
          {icon && (
            <Image
              style={[
                styles.tabbarIcon,
                {
                  tintColor:
                    routeName === selectedTab
                      ? uiStore.bgMode === 'light'
                        ? AppStyle.BottomTabColor.Orange
                        : AppStyle.BottomTabColor.Blue
                      : AppStyle.MoreColors.LightGray,
                },
              ]}
              source={icon}
            />
          )}
          <Text
            style={[
              styles.textLabel,
              {
                color:
                  routeName === selectedTab
                    ? uiStore.bgMode === 'light'
                      ? AppStyle.BottomTabColor.Orange
                      : AppStyle.BottomTabColor.Blue
                    : AppStyle.MoreColors.LightGray,
              },
            ]}>
            {routeName}
          </Text>
        </View>
      );
    };
    let prevRouteName = '';
    const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (
              routeName == i18n.t('statistic.statistic') &&
              prevRouteName !== i18n.t('statistic.statistic')
            ) {
              moodStore
                .getMoodsFollowMonth(
                  CommonFn.ym(`${calendarStore.curYearMonth}`),
                )
                .forEach(mood => {
                  moodStore.getArrMoodFollowMonth(mood);
                });
            }
            if (i18n.language === 'en') {
              if (routeName == 'Statistic' && prevRouteName !== 'Statistic') {
                moodStore.arrMoodsFollowMonth.forEach(e => {
                  let getTime = new Date(e.time);
                  let getDay = getTime.getDate();
                  let getId = moodStore.getIdFollowTypeRevert(
                    e.data[0].moodType,
                  );
                  moodStore.addMonthly({x: getDay, y: getId});
                });
                moodStore.MonthLy.sort((a, b) => a.x - b.x);
                moodStore.getMoodDayFollowMonth();
              } else if (
                routeName !== i18n.t('statistic.statistic') &&
                prevRouteName == i18n.t('statistic.statistic')
              ) {
                moodStore.removeArrMonthly();
                moodStore.removeArrAverage();
              }
            } else if (i18n.language === 'vi') {
              if (routeName == 'Thống kê' && prevRouteName !== 'Thống kê') {
                moodStore.arrMoodsFollowMonth.forEach(e => {
                  let getTime = new Date(e.time);
                  let getDay = getTime.getDate();
                  let getId = moodStore.getIdFollowTypeRevert(
                    e.data[0].moodType,
                  );
                  moodStore.addMonthly({x: getDay, y: getId});
                });
                moodStore.MonthLy.sort((a, b) => a.x - b.x);
                moodStore.getMoodDayFollowMonth();
              } else if (
                routeName !== i18n.t('statistic.statistic') &&
                prevRouteName == i18n.t('statistic.statistic')
              ) {
                moodStore.removeArrMonthly();
                moodStore.removeArrAverage();
              }
            }
            if (routeName == 'Calendar') {
              moodStore.arrMoodsFollowMonth.splice(0);
              moodStore
                .getMoodsFollowMonth(
                  CommonFn.ym(`${calendarStore.curYearMonth}`),
                )
                .forEach(mood => {
                  moodStore.getArrMoodFollowMonth(mood);
                });
            }
            prevRouteName = routeName;
            navigate(routeName);
          }}
          style={styles.renderTabBar}>
          {_renderIcon(routeName, selectedTab)}
        </TouchableOpacity>
      );
    };

    return (
      <CurvedBottomBar.Navigator
        screenOptions={{
          headerShown: false,
        }}
        style={{shadowOpacity: 0.05}}
        initialRouteName={i18n.t('calendar.calendar')}
        circleWidth={55}
        bgColor={
          uiStore.bgMode === 'light'
            ? AppStyle.BottomTabColor.BgLightMode
            : AppStyle.BottomTabColor.BgDarkMode
        }
        tabBar={renderTabBar}
        renderCircle={() => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              onPress={() => {
                rootNavigation.navigate('CenterTabBar');
                moodStore.arrMoodsFollowMonth.splice(0);
              }}>
              <Image
                style={styles.btnCenter}
                source={
                  uiStore.bgMode === 'light'
                    ? IC_TABBAR_ADD
                    : IC_TABBAR_ADD_BLUE
                }
              />
            </TouchableOpacity>
          </Animated.View>
        )}>
        <CurvedBottomBar.Screen
          name={i18n.t('calendar.calendar')}
          position="LEFT"
          component={({navigation}) => (
            <CalendarNavigator
              moodStore={moodStore}
              calendarStore={calendarStore}
              rootNavigation={navigation}
              uiStore={uiStore}
              userStore={userStore}
            />
          )}
        />
        <CurvedBottomBar.Screen
          name={i18n.t('statistic.statistic')}
          position="LEFT"
          component={({navigation}) => (
            <StatisticNavigator
              rootNavigation={navigation}
              uiStore={uiStore}
              userStore={userStore}
              moodStore={moodStore}
              calendarStore={calendarStore}
            />
          )}
        />
        <CurvedBottomBar.Screen
          name={i18n.t('challenges.challenges')}
          position="RIGHT"
          component={({navigation}) => (
            <ChallengeNavigator
              moodStore={moodStore}
              calendarStore={calendarStore}
              rootNavigation={navigation}
              uiStore={uiStore}
              challengeStore={challengeStore}
            />
          )}
        />
        <CurvedBottomBar.Screen
          name={i18n.t('settings.settings')}
          position="RIGHT"
          options={{tabBarStyle: {display: 'none'}}}
          component={({navigation}) => (
            <SettingNavigator
              uiStore={uiStore}
              userStore={userStore}
              navigation={navigation}
              rootNavigation={rootNavigation}
            />
          )}
        />
      </CurvedBottomBar.Navigator>
    );
  },
);

export default BottomTabbar;

const styles = StyleSheet.create({
  tabbarContainer: {
    height: isTablet() ? 80 : 59 + heightFooter,
    elevation: 20,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    backgroundColor: AppStyle.BGColor.Main,
    paddingBottom: isTablet() ? 16 : heightFooter + 4,
    borderColor: AppStyle.BGColor.Main,
    borderTopColor: AppStyle.BGColor.Main,
    borderWidth: 0.5,
    position: 'absolute',
  },
  tabbarIcon: {
    resizeMode: 'contain',
    marginTop: 5,
    width: AppStyle.Screen.FullWidth * 0.06,
    height: AppStyle.Screen.FullWidth * 0.06,
  },
  textLabel: {
    fontWeight: '400',
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    bottom: 25,
  },
  btnCenter: {
    width: 60,
    height: 60,
  },
  itemTabbar: {
    flexDirection: 'column',
    height: 50,
    alignItems: 'center',
  },
  renderTabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
