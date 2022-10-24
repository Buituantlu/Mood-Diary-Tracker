import {reaction} from 'mobx';
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, processColor} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {
  ic_empty_sun,
  IMG_EMOJI_AWFUL,
  IMG_EMOJI_BAD,
  IMG_EMOJI_GOOD,
  IMG_EMOJI_MEH,
  IMG_EMOJI_RAD,
} from '../../../utils/icons';
import BaseText from '../../calendar/component/text';
import CalendarStore from '../../calendar/store/calendar_store';

interface MoodCountProps {
  uiStore: UIStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
}

const MoodCount = observer(
  ({moodStore, uiStore, calendarStore}: MoodCountProps) => {
    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );
    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);
    const emojiList = [
      {
        id: 0,
        count: 0,
        text: 'Rad',
        text2: i18n.t('rad'),
        icon: IMG_EMOJI_RAD,
      },
      {
        id: 1,
        count: 0,
        text: 'Good',
        text2: i18n.t('good'),
        icon: IMG_EMOJI_GOOD,
      },
      {
        id: 2,
        count: 0,
        text: 'Meh',
        text2: i18n.t('meh'),
        icon: IMG_EMOJI_MEH,
      },
      {
        id: 3,
        count: 0,
        text: 'Bad',
        text2: i18n.t('bad'),
        icon: IMG_EMOJI_BAD,
      },
      {
        id: 4,
        count: 0,
        text: 'Awful',
        text2: i18n.t('awful'),
        icon: IMG_EMOJI_AWFUL,
      },
    ];
    let arrMoods = moodStore?.arrMoods;
    let arrMoodsFollowMonth = arrMoods.filter(
      item =>
        new Date(item.createTime!).getMonth() + 1 == calendarStore.curMonth,
    );

    emojiList.forEach(element => {
      const res = arrMoodsFollowMonth.filter(
        item => item.moodType === element.text.toLowerCase(),
      );
      element.count = res.length;
    });

    const ItemEmoji = props => {
      return (
        <View style={styles.boxItem}>
          <View style={styles.wrapperCount}>
            <Image style={styles.emojiSize} source={props.icon} />
            {props.count == 0 ? null : (
              <View style={styles.countItemEmoji}>
                <Text style={styles.txtCountEmoji}>{props.count}</Text>
              </View>
            )}
          </View>
          <Text style={styles.emojiText} numberOfLines={1}>
            {props.text2}
          </Text>
        </View>
      );
    };
    return (
      <View style={styles.container}>
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
            style={styles.titleItem}
            text={i18n.t('statistic.mood_count')}
          />
        </View>
        {!arrMoodsFollowMonth.length ? (
          <View
            style={[
              styles.wrapperEmpty,
              {
                backgroundColor:
                  uiStore.bgMode === 'light'
                    ? AppStyle.BGColor.White
                    : AppStyle.BGColor.GrayDark,
              },
            ]}>
            <Image source={ic_empty_sun} style={styles.imageEmpty} />
            <BaseText
              uiStore={uiStore}
              style={styles.textEmpty}
              text={i18n.t('statistic.empty_chart')}
            />
          </View>
        ) : (
          <View
            style={[
              styles.wrapper,
              {
                backgroundColor:
                  uiStore.bgMode === 'light'
                    ? AppStyle.BGColor.White
                    : AppStyle.BGColor.GrayDark,
              },
            ]}>
            <PieChart
              chartDescription={{text: ''}}
              style={styles.chart}
              holeRadius={55}
              rotationAngle={0}
              usePercentValues={true}
              legend={{enabled: false}}
              transparentCircleRadius={60}
              styledCenterText={{
                color: processColor(
                  uiStore.bgMode === 'light'
                    ? AppStyle.MoreColors.OrangeMain
                    : AppStyle.MoreColors.BlueMain,
                ),
                size: 35,
                fontWeight: '600',
                text: `${arrMoodsFollowMonth?.length?.toString()}`,
              }}
              data={{
                dataSets: [
                  {
                    values: emojiList.map(item => ({value: item.count})),
                    label: '',
                    config: {
                      colors: [
                        processColor('#f6b357'),
                        processColor('#f4c60a'),
                        processColor('#93ccab'),
                        processColor('#9daee8'),
                        processColor('#d9c0dc'),
                      ],
                      valueTextSize: 10,
                      sliceSpace: 5,
                      valueFormatter: "#.#'%'",
                    },
                  },
                ],
              }}
            />
            <View style={styles.boxEmoji}>
              {emojiList.map(item => {
                return (
                  <ItemEmoji
                    key={item.id}
                    icon={item.icon}
                    text={item.text}
                    text2={item.text2}
                    count={item.count}
                  />
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  },
);

export default MoodCount;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  imageEmpty: {
    width: 130,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  textEmpty: {
    fontSize: 15,
    textAlign: 'center',
  },
  wrapperEmpty: {
    width: AppStyle.Screen.FullWidth - 16,
    height: 340,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  wrapper: {
    width: AppStyle.Screen.FullWidth - 16,
    height: 340,
    borderRadius: 10,
  },
  chart: {
    height: AppStyle.Screen.FullWidth * 0.66,
  },
  boxEmoji: {
    height: 70,
    width: AppStyle.Screen.FullWidth - 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  emojiSize: {
    width: 40,
    height: 40,
  },
  boxItem: {
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperCount: {
    alignItems: 'flex-end',
  },
  emojiText: {
    fontSize: 13,
    marginTop: 5,
    fontFamily: 'Quicksand-Medium',
  },
  countItemEmoji: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f29343',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  txtCountEmoji: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Quicksand-Medium',
  },
  boxTitleItem: {
    marginTop: 10,
    marginBottom: 3,
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 8,
  },
  titleItem: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
  },
});
