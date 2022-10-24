import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import CalendarStore from '../../calendar/store/calendar_store';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {ic_empty_sun} from '../../../utils/icons';
import BaseText from '../../calendar/component/text';
import i18n from '../../../utils/i18n';

interface ActivityCountProps {
  uiStore: UIStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
}

const ActivityCount = observer(
  ({uiStore, moodStore, calendarStore}: ActivityCountProps) => {
    const arrMoods = moodStore?.arrMoods;
    let arrMoodsFollowMonth = arrMoods.filter(
      item =>
        new Date(item.createTime!).getMonth() + 1 == calendarStore.curMonth,
    );

    let arrActivitiesFollowMonth = arrMoodsFollowMonth
      .filter(item => item.activitiesObj !== undefined)
      .map(item => item.activitiesObj)
      .flat();

    const arrActivitiesFollowMonthLast = _.uniqBy(
      arrActivitiesFollowMonth,
      e => e?.id,
    );

    const countActivities = _.countBy(arrActivitiesFollowMonth, e => e?.id);

    const ItemTasks = ({image, name, id}) => {
      return (
        <View style={styles.itemTasks}>
          <View>
            <Image
              style={[
                styles.styleIconTasks,
                {
                  tintColor:
                    uiStore.bgMode === 'light'
                      ? AppStyle.MoreColors.OrangeMain
                      : AppStyle.MoreColors.BlueMain,
                },
              ]}
              source={moodStore.getIconFollowImg(image)}
            />
            <View
              style={[
                styles.countItemEmoji,
                {
                  backgroundColor:
                    uiStore.bgMode === 'light'
                      ? AppStyle.MoreColors.OrangeMain
                      : AppStyle.MoreColors.BlueMain,
                },
              ]}>
              <Text style={styles.txtCountEmoji}>{countActivities[id]}</Text>
            </View>
          </View>
          <Text style={styles.txtTasks} numberOfLines={1}>
            {i18n.t(image)}
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
            text={i18n.t('statistic.activity_count')}
          />
        </View>
        {_.isEmpty(countActivities) ? (
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
          <ScrollView
            style={[
              styles.wrapper,
              {
                backgroundColor:
                  uiStore.bgMode === 'light'
                    ? AppStyle.BGColor.White
                    : AppStyle.BGColor.GrayDark,
              },
            ]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <FlatList
              data={arrActivitiesFollowMonthLast}
              horizontal={true}
              scrollEnabled={false}
              contentContainerStyle={{
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}
              keyExtractor={item => item!.id.toString()}
              renderItem={({item}) => {
                return (
                  <ItemTasks
                    image={item?.image}
                    id={item?.id}
                    name={item?.name}
                  />
                );
              }}
            />
          </ScrollView>
        )}
      </View>
    );
  },
);

export default ActivityCount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  boxTitleItem: {
    marginTop: 10,
    paddingLeft: 15,
    marginBottom: 3,
    borderRadius: 10,
    paddingVertical: 8,
  },
  titleItem: {
    fontSize: 15,
    fontFamily: 'Quicksand-Medium',
  },
  wrapper: {
    height: 150,
    paddingTop: 10,
    borderRadius: 10,
  },
  wrapperEmpty: {
    height: 160,
    paddingTop: 10,
    width: AppStyle.Screen.FullWidth - 16,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  imageEmpty: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  textEmpty: {
    fontSize: 15,
    textAlign: 'center',
  },
  itemTasks: {
    width: AppStyle.Screen.FullWidth * 0.25,
    height: 60,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleIconTasks: {
    width: 30,
    height: 30,
    tintColor: '#f27a2c',
    resizeMode: 'contain',
  },
  txtTasks: {
    fontSize: 12,
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
});
