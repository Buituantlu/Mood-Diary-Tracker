import {observer} from 'mobx-react';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';
import AppStyle from '../../../shared/ui/styles/app.style';
import {IC_ADD_THIN, IC_OVAL} from '../../../utils/icons';
import BaseText from '../component/text';
import CalendarStore from '../store/calendar_store';
import ListMoodFollowDay from './list_mood_follow_day';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
const {width} = Dimensions.get('window');

interface ListMoodFollowMonthProps {
  moodStore: MoodStore;
  calendarStore: CalendarStore;
  uiStore: UIStore;
  rootNavigation: NavigationProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}

const ListMoodFollowMonth = observer(
  ({
    moodStore,
    calendarStore,
    uiStore,
    rootNavigation,
    navigation,
  }: ListMoodFollowMonthProps) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          flex: 1,
        }}>
        {moodStore.arrMoodsFollowMonth.length > 0 &&
          moodStore.arrMoodsFollowMonth.map(arrMood => {
            return (
              <View key={arrMood.data[0].id} style={{paddingBottom: 8}}>
                <View
                  style={[
                    styles.container,
                    {
                      backgroundColor:
                        uiStore.bgMode === 'light'
                          ? AppStyle.BGColor.White
                          : AppStyle.BGColor.GrayDark,
                    },
                  ]}>
                  <View style={styles.containerTxt}>
                    <Image
                      style={[
                        styles.icOval,
                        {
                          tintColor: moodStore.getColorFollowType(
                            arrMood.data[0].moodType,
                          ),
                        },
                      ]}
                      source={IC_OVAL}
                    />
                    <View style={styles.containerDays}>
                      <View style={{flexDirection: 'row'}}>
                        <BaseText
                          uiStore={uiStore}
                          style={styles.txtDay}
                          text={
                            calendarStore.getDayInMonth(arrMood.time) + ', '
                          }
                        />
                        <BaseText
                          uiStore={uiStore}
                          style={styles.txtDay}
                          text={CommonFn.ymd(arrMood.time)}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('CenterTabBar', {
                        screen: 'CenterTabBar',
                        params: {createTimeMood: arrMood.time},
                      });
                      moodStore.arrMoodsFollowMonth.splice(0);
                    }}
                    style={{right: 8}}>
                    <Image
                      source={IC_ADD_THIN}
                      style={[
                        styles.imgAdd,
                        {
                          tintColor:
                            uiStore.bgMode === 'light'
                              ? AppStyle.BGColor.Black
                              : AppStyle.BGColor.Gray,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                {arrMood.data.map(e => {
                  return (
                    <ListMoodFollowDay
                      key={e?.id}
                      listDay={e}
                      moodStore={moodStore}
                      uiStore={uiStore}
                      navigation={navigation}
                    />
                  );
                })}
              </View>
            );
          })}
      </ScrollView>
    );
  },
);

export default ListMoodFollowMonth;

const styles = StyleSheet.create({
  containerDays: {
    height: width / 15,
    borderRadius: 6,
    marginHorizontal: 4,
    marginTop: 3,
    marginBottom: 5,
    alignItems: 'center',
    paddingLeft: 18,
    flexDirection: 'row',
  },
  txtDay: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 24,
    marginHorizontal: 4,
    marginBottom: 4,
  },
  icOval: {
    height: 16,
    width: 16,
  },
  containerTxt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgAdd: {
    height: 24,
    width: 24,
  },
});
