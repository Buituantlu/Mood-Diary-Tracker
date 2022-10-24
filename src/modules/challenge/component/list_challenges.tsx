import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {
  IC_ADD,
  IC_ADD_BLUE,
  IC_STAR,
  IC_TICK_CHALLENGE,
} from '../../../utils/icons';
import BaseText from '../../calendar/component/text';
import CalendarStore from '../../calendar/store/calendar_store';
import ChallengeStore from '../store/challenge_store';

interface ListChallengesProps {
  uiStore: UIStore;
  item: any;
  navigation: NavigationProp<ParamListBase>;
  challengeStore: ChallengeStore;
  time: number;
  calendarStore: CalendarStore;
}

const ListChallenges = observer(
  ({
    uiStore,
    item,
    navigation,
    calendarStore,
    time,
    challengeStore,
  }: ListChallengesProps) => {
    const [count, setCount] = useState(0);
    const [process, setProcess] = useState(0);
    const [done, setDone] = useState(false);
    let now = new Date(calendarStore.curDate).getTime();
    challengeStore.mathDay(item.startTime, item.endTime);
    let totalDay = challengeStore.spaceDay / (24 * 60 * 60 * 1000) + 1;
    useEffect(() => {
      let index = item.arrDone.findIndex(a => a == time);
      if (index == -1) {
        setProcess(item.arrDone.length * (1 / totalDay) * 100);
        setCount(item.arrDone.length);
        setDone(false);
      } else {
        setProcess(item.arrDone.length * (1 / totalDay) * 100);
        setCount(item.arrDone.length);
        setDone(true);
      }
    }, [time]);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('item');
          // navigation.navigate('ChallengeDetailScreen', {
          //   challengeData: item,
          // });
        }}
        style={[
          styles.btnChallenge,
          {
            backgroundColor:
              uiStore.bgMode == 'dark'
                ? AppStyle.BGColor.GrayDark
                : AppStyle.BGColor.White,
          },
        ]}>
        <Image
          style={[styles.imageChallenge, {tintColor: item.color}]}
          source={item.image}
        />
        <View
          style={[
            styles.separator,
            {width: uiStore.bgMode == 'dark' ? 1.4 : 0.4},
            {
              backgroundColor:
                uiStore.bgMode == 'dark'
                  ? AppStyle.BGColor.White
                  : AppStyle.BGColor.GrayDark,
            },
          ]}
        />
        <View style={{flex: 1}}>
          <BaseText
            uiStore={uiStore}
            style={styles.txtName}
            text={i18n.t(`challenges.${item.title}`)}
          />
          <BaseText
            uiStore={uiStore}
            style={styles.txtListDay}
            text={i18n.t(`challenges.${item.repeat}`)}
          />

          <View style={styles.course}>
            <BaseText uiStore={uiStore} style={styles.txtStar} text={count} />
            <Image
              style={[
                styles.star,
                {
                  tintColor:
                    uiStore.bgMode == 'dark'
                      ? AppStyle.BGColor.White
                      : AppStyle.BGColor.Black,
                },
              ]}
              source={IC_STAR}
            />
            <View style={styles.containerLine}>
              <View
                style={[
                  styles.lineDown,
                  {
                    backgroundColor:
                      uiStore.bgMode == 'dark' ? '#3d3f4e' : '#e3e3e5',
                  },
                ]}
              />
              {true && (
                <View
                  style={{
                    position: 'absolute',
                    width: `${process}%`,
                    backgroundColor:
                      uiStore.bgMode == 'dark'
                        ? AppStyle.BGColor.BlueSky
                        : '#f47c33',
                    height: 6,
                    borderRadius: 50,
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            if (time <= now) {
              if (done) {
                challengeStore.removeDateDone(time, item.id);
                setProcess(process - (1 / totalDay) * 100);
                setCount(count - 1);
              } else {
                challengeStore.addDateDone(time, item.id);
                setProcess(process + (1 / totalDay) * 100);
                setCount(count + 1);
              }
              setDone(!done);
            }
          }}>
          <View style={styles.btnAdd}>
            {done ? (
              <Image style={styles.imgAdd} source={IC_TICK_CHALLENGE} />
            ) : (
              <Image
                style={styles.imgAdd}
                source={uiStore.bgMode === 'light' ? IC_ADD : IC_ADD_BLUE}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    );
  },
);

export default ListChallenges;

const styles = StyleSheet.create({
  btnChallenge: {
    height: 100,
    marginHorizontal: 8,
    borderRadius: 10,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 75,
    marginRight: 20,
  },
  star: {
    height: 13,
    width: 13,
    marginHorizontal: 4,
  },

  imageChallenge: {
    height: 34,
    width: 34,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  txtName: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 20,
  },
  txtListDay: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    paddingBottom: 8,
  },
  course: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStar: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 14,
  },
  btnAdd: {
    marginRight: 10,
  },
  imgAdd: {
    height: 30,
    width: 30,
  },
  lineDown: {
    position: 'relative',
    width: '100%',
    height: 6,
    borderRadius: 50,
  },
  containerLine: {
    height: 6,
    width: '86%',
  },
});
