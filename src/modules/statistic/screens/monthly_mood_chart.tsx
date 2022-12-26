import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {Image, Platform, processColor, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import Dash from 'react-native-dash';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {
  IC_BASE_AWFUL,
  IC_BASE_BAD,
  IC_BASE_GOOD,
  IC_BASE_MEH,
  IC_BASE_RAD,
} from '../../../utils/icons';
import BaseText from '../../calendar/component/text';
import CalendarStore from '../../calendar/store/calendar_store';

interface MonthLyMoodChartProps {
  moodStore: MoodStore;
  calendarStore: CalendarStore;
  uiStore: UIStore;
}

const MonthLyMoodChart = observer(
  ({moodStore, calendarStore, uiStore}: MonthLyMoodChartProps) => {
    const DashedLine = ({image}) => {
      return (
        <View style={styles.containerMood}>
          <Image source={image} style={styles.image} />
          <Dash
            style={[
              styles.dashedLine,
              {opacity: uiStore.bgMode == 'dark' ? 1 : 0.2},
            ]}
            dashColor={
              uiStore.bgMode == 'dark'
                ? AppStyle.BGColor.White
                : AppStyle.BGColor.GrayDark
            }
            dashLength={8}
            dashThickness={1}
            dashGap={4}
          />
        </View>
      );
    };
    const arrMood = [
      IC_BASE_RAD,
      IC_BASE_GOOD,
      IC_BASE_MEH,
      IC_BASE_BAD,
      IC_BASE_AWFUL,
    ];
    return (
      <View>
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
            style={styles.txtHeader}
            text={i18n.t('statistic.monthly_mood_chart')}
          />
        </View>
        <View
          style={[
            styles.containerChart,
            {
              backgroundColor:
                uiStore.bgMode === 'light'
                  ? AppStyle.BGColor.White
                  : AppStyle.BGColor.GrayDark,
            },
          ]}>
          <View style={styles.viewMood}>
            {arrMood.map((mood, index) => {
              return <DashedLine key={index} image={mood} />;
            })}
          </View>

          <LineChart
            style={styles.chart}
            chartDescription={{text: ''}}
            drawValues={false}
            legend={{
              enabled: false,
            }}
            xAxis={{
              drawGridLines: false,
              position: 'BOTTOM',
              drawAxisLine: false,
              drawLimitLinesBehindData: true,
              axisMaximum: 31,
              fontFamily: 'Quicksand-Medium',
              textSize: 12,
              textColor:
                uiStore.bgMode == 'dark'
                  ? processColor('#FFF')
                  : processColor('#000'),
            }}
            yAxis={{
              left: {
                enabled: false,
              },
              right: {
                enabled: false,
              },
            }}
            doubleTapToZoomEnabled={false}
            marker={{
              enabled: false,
              markerColor: processColor('#392392'),
            }}
            data={{
              dataSets: [
                {
                  values: toJS(moodStore.MonthLy),
                  label: '',
                  config: {
                    circleRadius: 5,
                    lineWidth: 3,
                    drawCircleHole: false,
                    circleColor: processColor('#f5ad6e'),
                    color: processColor('pink'),
                    drawFilled: true,
                    drawValues: false,
                  },
                },
                {
                  values: [
                    {x: 1, y: 1},
                    {
                      x: 31,
                      y: 5,
                    },
                  ],
                  label: '',
                  config: {
                    drawCircleHole: false,
                    circleColor: processColor('transparent'),
                    color: processColor('transparent'),
                    drawFilled: false,
                    drawValues: false,
                  },
                },
              ],
            }}
          />
        </View>
      </View>
    );
  },
);

export default MonthLyMoodChart;

const styles = StyleSheet.create({
  containerChart: {
    width: AppStyle.Screen.FullWidth - 16,
    height: 270,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 22,
  },
  boxTitleItem: {
    marginTop: 10,
    marginBottom: 3,
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 8,
  },
  chart: {
    flex: 1,
    marginLeft: 41,
    marginBottom: 4,
  },
  image: {
    height: 34,
    width: 34,
  },
  dashedLine: {
    marginLeft: 55,
    marginRight: 9,
  },
  viewMood: {
    height: 270,
    width: AppStyle.Screen.FullWidth - 32,
    position: 'absolute',
    paddingLeft: 8,
    paddingTop: 15,
  },
  txtHeader: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
  },
  containerMood: {
    height: 45,
    paddingTop: Platform.OS == 'android' ? 5 : 0,
  },
});
