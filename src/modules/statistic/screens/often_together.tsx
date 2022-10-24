import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import {
  ic_right_orange,
  IMG_EMOJI_AWFUL,
  IMG_EMOJI_BAD,
  IMG_EMOJI_GOOD,
  IMG_EMOJI_MEH,
  IMG_EMOJI_RAD,
} from '../../../utils/icons';
import CalendarStore from '../../calendar/store/calendar_store';
import {ScrollView} from 'react-native-gesture-handler';
import {observer} from 'mobx-react';
import BaseText from '../../calendar/component/text';
import i18n from '../../../utils/i18n';
import {reaction} from 'mobx';

interface OftenTogetherProps {
  uiStore: UIStore;
  moodStore: MoodStore;
  calendarStore: CalendarStore;
}

const OftenTogether = observer(
  ({uiStore, calendarStore, moodStore}: OftenTogetherProps) => {
    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );
    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);

    const listEmoji = [
      {
        id: 0,
        text: 'rad',
        text2: i18n.t('rad'),
        icon: IMG_EMOJI_RAD,
      },
      {
        id: 1,
        text: 'good',
        text2: i18n.t('good'),
        icon: IMG_EMOJI_GOOD,
      },
      {
        id: 2,
        text: 'meh',
        text2: i18n.t('meh'),
        icon: IMG_EMOJI_MEH,
      },
      {
        id: 3,
        text: 'bad',
        text2: i18n.t('bad'),
        icon: IMG_EMOJI_BAD,
      },
      {
        id: 4,
        text: 'awful',
        text2: i18n.t('awful'),
        icon: IMG_EMOJI_AWFUL,
      },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [textSelect, setTextSelect] = useState(listEmoji[0].text);
    const [textSelect2, setTextSelect2] = useState(listEmoji[0].text2);
    const [iconSelect, setIconSelect] = useState(listEmoji[0].icon);
    const arrMoods = moodStore?.arrMoods;
    let arrMoodsFollowMonth = arrMoods.filter(
      item =>
        new Date(item.createTime!).getMonth() + 1 == calendarStore.curMonth,
    );

    const arrMoodsFollowType = arrMoodsFollowMonth.filter(
      item => item.moodType == textSelect.toLowerCase(),
    );

    const arrActivitiesObj = arrMoodsFollowType
      .filter(item => item.activitiesObj !== undefined)
      .map(item => item.activitiesObj)
      .flat();

    const arrActivitiesObjLast = _.uniqBy(arrActivitiesObj, e => {
      return e?.id;
    });

    const countActivities = _.countBy(arrActivitiesObj, e => {
      return e?.id;
    });

    const onModal = () => {
      setModalVisible(true);
    };

    const ItemEmoji = props => {
      return (
        <TouchableOpacity style={styles.itemEmoji} onPress={props.onPress}>
          <Image style={styles.styleChooseEmoji} source={props.icon} />
        </TouchableOpacity>
      );
    };

    useEffect(() => {
      setIconSelect(listEmoji[0].icon);
      setTextSelect(listEmoji[0].text);
      setTextSelect2(listEmoji[0].text2);
    }, [calendarStore.curMonth]);

    const ItemTasks = props => {
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
              source={moodStore.getIconFollowImg(props.image)}
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
              <Text style={styles.txtCountEmoji}>
                {countActivities[props.id]}
              </Text>
            </View>
          </View>
          <Text style={styles.txtTasks} numberOfLines={1}>
            {i18n.t(props.name)}
          </Text>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
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
            text={i18n.t('statistic.often_together')}
          />
        </View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor:
                    uiStore.bgMode === 'light'
                      ? AppStyle.BGColor.White
                      : AppStyle.BGColor.GrayDark,
                },
              ]}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={require('../../../assets/icons/ic_close.png')}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <View style={styles.wrapperEmoji}>
                {listEmoji.map(item => {
                  return (
                    <ItemEmoji
                      key={item.id}
                      icon={item.icon}
                      onPress={() => (
                        setTextSelect(item.text),
                        setTextSelect2(item.text2),
                        setIconSelect(item.icon),
                        setModalVisible(!modalVisible)
                      )}
                    />
                  );
                })}
              </View>
              <Text style={styles.modalText}>Select Mood</Text>
            </View>
          </View>
        </Modal>

        <View>
          <View
            style={[
              styles.boxItem,
              {
                backgroundColor:
                  uiStore.bgMode === 'light'
                    ? AppStyle.BGColor.White
                    : AppStyle.BGColor.GrayDark,
              },
            ]}>
            <TouchableWithoutFeedback onPress={onModal}>
              <View
                style={[
                  styles.btnSellectMood,
                  {
                    borderColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.MoreColors.OrangeMain
                        : AppStyle.MoreColors.BlueMain,
                  },
                ]}>
                <Image source={iconSelect} style={styles.emojiSize} />
                <BaseText
                  uiStore={uiStore}
                  style={styles.txtBtnSellectMood}
                  text={textSelect2}
                />
                <Image
                  style={[
                    styles.iconRightSellectMood,
                    {
                      tintColor:
                        uiStore.bgMode === 'light'
                          ? AppStyle.MoreColors.OrangeMain
                          : AppStyle.MoreColors.BlueMain,
                    },
                  ]}
                  source={ic_right_orange}
                />
              </View>
            </TouchableWithoutFeedback>
            <BaseText
              uiStore={uiStore}
              style={styles.txtTitleOften}
              text={i18n.t('statistic.you_often_do_this')}
            />
            <ScrollView
              style={styles.boxTasks}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {arrActivitiesObjLast.map(item => {
                return (
                  <ItemTasks
                    id={item?.id}
                    key={item?.id}
                    image={item?.image}
                    name={item?.image}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  },
);

export default OftenTogether;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  boxItem: {
    width: '100%',
    marginBottom: 5,
    borderRadius: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtItem: {
    fontSize: 15,
  },
  btnSellectMood: {
    width: '50%',
    height: 45,
    marginTop: 10,
    borderRadius: 30,
    flexDirection: 'row',
    borderColor: '#f1813b',
    borderWidth: 1,
    alignItems: 'center',
    paddingLeft: 5,
  },
  emojiSize: {
    width: 35,
    height: 35,
  },
  txtBtnSellectMood: {
    fontSize: 15,
    marginLeft: 10,
    fontFamily: 'Quicksand-Medium',
  },
  iconRightSellectMood: {
    right: 10,
    width: 20,
    height: 20,
    position: 'absolute',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(89, 89, 89, 0.7)',
  },
  modalView: {
    width: width * 0.9,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  closeBtn: {
    borderRadius: 20,
    padding: 10,
    alignItems: 'flex-end',
  },
  wrapperEmoji: {
    width: width * 0.9 * 0.98,
    height: 120,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: width * 0.9 * 0.98 * 0.1,
  },
  itemEmoji: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleChooseEmoji: {
    width: 50,
    height: 50,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
  txtTitleOften: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    fontFamily: 'Quicksand-Medium',
  },
  boxTasks: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  itemTasks: {
    width: AppStyle.Screen.FullWidth * 0.25,
    height: 80,
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
