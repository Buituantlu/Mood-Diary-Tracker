import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {observer} from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  getObjectDataLocal,
  saveObjectDataLocal,
} from '../../../services/storage';
import MoodStore, {SAVE_MOODS} from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import {LOCAL_USER_KEY} from '../../../shared/store/user';
import BaseHeader from '../../../shared/ui/containers/base_header';
import AppStyle from '../../../shared/ui/styles/app.style';
import {
  IC_ADD_MOODY,
  IC_CLOSE_ROUND,
  IC_DOT_WHITE,
  IC_TICK_EMOJI,
  IMG_EMOJI_AWFUL,
  IMG_EMOJI_AWFUL_GIF,
  IMG_EMOJI_BAD,
  IMG_EMOJI_BAD_GIF,
  IMG_EMOJI_GOOD,
  IMG_EMOJI_GOOD_GIF,
  IMG_EMOJI_MEH,
  IMG_EMOJI_MEH_GIF,
  IMG_EMOJI_RAD,
  IMG_EMOJI_RAD_GIF,
} from '../../../utils/icons';
import CalendarStore from '../../calendar/store/calendar_store';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';
import i18n from '../../../utils/i18n';
import firestore from '@react-native-firebase/firestore';

interface CenterTabbarScreenProps {
  uiStore: UIStore;
  calendarStore: CalendarStore;
  moodStore: MoodStore;
  rootNavigation: NavigationProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ItemEmoji = ({src, text, textColor, onPress, opacity, icTick}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.emojiItem}>
      <View style={styles.boxEmoji}>
        <Image style={[styles.emojiStyle, {opacity: opacity}]} source={src} />
        <Image
          style={{width: 15, height: 15, position: 'absolute'}}
          source={icTick}
        />
      </View>
      <Text style={[styles.txtEmoji, {color: textColor}]} numberOfLines={1}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const CenterTabbarScreen = observer(
  ({route, calendarStore, moodStore, navigation}: CenterTabbarScreenProps) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const [nickName, setNickName] = useState<string>('');
    const [bgColor, setBgColor] = useState<string>('#8ee4e8');
    const getNickName = async () => {
      const result = await getObjectDataLocal(LOCAL_USER_KEY);
      setNickName(result?.nickname);
    };
    useEffect(() => {
      getNickName();
      const now = new Date();
      let H = now.getUTCHours();
      let M = now.getUTCMinutes();
      let time = new Date(
        new Date(route.params?.createTimeMood).getTime() +
          H * 60 * 60 * 1000 +
          M * 60 * 1000,
      );
      if (route.params?.createTimeMood) {
        setDate(time);
      }
    }, []);

    const renderItem = ({item}) => {
      const opacity = bgColor == item.color ? 1 : 0.5;
      const img = bgColor == item.color ? item.imgGif : item.img;
      const textColor =
        bgColor == item.color
          ? AppStyle.TextColor.Accent
          : AppStyle.TextColor.Black;
      const icTick = bgColor == item.color ? IC_TICK_EMOJI : IC_DOT_WHITE;
      return (
        <ItemEmoji
          onPress={() => {
            setBgColor(item.color);
          }}
          src={img}
          text={item.text}
          icTick={icTick}
          opacity={opacity}
          textColor={textColor}
        />
      );
    };

    const LIST_EMOJI = [
      {
        img: IMG_EMOJI_RAD,
        imgGif: IMG_EMOJI_RAD_GIF,
        text: i18n.t('rad'),
        color: '#f5ad6e',
      },
      {
        img: IMG_EMOJI_GOOD,
        imgGif: IMG_EMOJI_GOOD_GIF,
        text: i18n.t('good'),
        color: '#edd462',
      },
      {
        img: IMG_EMOJI_MEH,
        imgGif: IMG_EMOJI_MEH_GIF,
        text: i18n.t('meh'),
        color: '#93ccab',
      },
      {
        img: IMG_EMOJI_BAD,
        imgGif: IMG_EMOJI_BAD_GIF,
        text: i18n.t('bad'),
        color: '#b1bfeb',
      },
      {
        img: IMG_EMOJI_AWFUL,
        imgGif: IMG_EMOJI_AWFUL_GIF,
        text: i18n.t('awful'),
        color: '#979d99',
      },
    ];

    const getBgMood = (color: string) => {
      switch (bgColor) {
        case '#f5ad6e':
          return 'rad';
        case '#edd462':
          return 'good';
        case '#93ccab':
          return 'meh';
        case '#b1bfeb':
          return 'bad';
        case '#979d99':
          return 'awful';
        default:
          break;
      }
    };

    const getNameFollowColor = (color: string) => {
      switch (bgColor) {
        case '#f5ad6e':
          return 'Rad';
        case '#edd462':
          return 'Good';
        case '#93ccab':
          return 'Meh';
        case '#b1bfeb':
          return 'Bad';
        case '#979d99':
          return 'Awful';
        default:
          break;
      }
    };

    const onSave = () => {
      let time = new Date().getTime();
      firestore()
        .collection(`${moodStore.idDevice}`)
        .doc(`${time}`)
        .set({
          id: time,
          inputName: getNameFollowColor(bgColor),
          moodType: getBgMood(bgColor),
          createTime: date.getTime(),
        })
        .then(() => {
          console.log('Mood added!');
        });
      const arrMods = moodStore.getMoodsFollowDate(
        route?.params?.createTimeMood ? route.params.createTimeMood : date,
      );
      moodStore.setArrMoodDay(arrMods);
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
      saveObjectDataLocal(SAVE_MOODS, moodStore.arrMoods);
      navigation.navigate('Calendar');
    };

    const onBack = () => {
      moodStore
        .getMoodsFollowMonth(CommonFn.ym(`${calendarStore.curYearMonth}`))
        .forEach(mood => {
          moodStore.getArrMoodFollowMonth(mood);
        });
      navigation.goBack();
    };

    const onAddDetail = () => {
      navigation.navigate('AddMoodDetail', {
        moodType: getBgMood(bgColor),
        createTimeMood: new Date(date).getTime(),
      });
    };

    const onNewMood = () => {
      console.log('abc');
    };

    return (
      <View style={[styles.modalView, {backgroundColor: bgColor}]}>
        <BaseHeader
          containerStyle={[styles.header, {backgroundColor: bgColor}]}
          rightElement={
            <Image style={styles.rightIcon} source={IC_ADD_MOODY} />
          }
          rightAction={onNewMood}
          leftElement={
            <Image style={styles.leftIcon} source={IC_CLOSE_ROUND} />
          }
          leftAction={onBack}
        />
        <View style={styles.boxTitle}>
          <Text style={styles.txtTitle}>
            {`${i18n.t('calendar.hi')} ${nickName}`}!{' '}
          </Text>
          <Text style={styles.txtTitle}>
            {i18n.t('calendar.how_are_you_feeling')}
          </Text>
        </View>
        <TouchableOpacity style={styles.boxDate} onPress={() => setOpen(true)}>
          <Text style={styles.txtDate}>
            {moment(date).format('HH:mm' + ', ' + 'Do MMMM YYYY')}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          locale={'en_GB'}
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.emojiOption}>
          <FlatList
            scrollEnabled={false}
            data={LIST_EMOJI}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={item => item.img}
          />
        </View>
        <View style={styles.boxBtn}>
          {bgColor == '#8ee4e8' ? (
            <TouchableOpacity style={styles.btnSave}>
              <Text style={styles.txtBtn}>{i18n.t('save')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSave} style={styles.btnSave}>
              <Text style={styles.txtBtn}>{i18n.t('save')}</Text>
            </TouchableOpacity>
          )}
          {bgColor == '#8ee4e8' ? (
            <TouchableOpacity
              style={[styles.btnSave, {backgroundColor: '#596073'}]}>
              <Text style={styles.txtBtn}>{i18n.t('add_detail')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onAddDetail}
              style={[styles.btnSave, {backgroundColor: '#596073'}]}>
              <Text style={styles.txtBtn}>{i18n.t('add_detail')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

export default CenterTabbarScreen;

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight,
  },
  header: {},
  rightIcon: {
    width: 50,
    resizeMode: 'contain',
  },
  leftIcon: {
    width: 40,
    resizeMode: 'contain',
  },
  boxTitle: {
    marginTop: 30,
    alignItems: 'center',
  },
  txtTitle: {
    fontWeight: '700',
    fontSize: 28,
    color: '#FFFFFF',
  },
  txtDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  boxDate: {
    width: AppStyle.Screen.FullWidth * 0.6,
    height: 50,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.15)',
  },
  emojiOption: {
    width: AppStyle.Screen.FullWidth - 10,
    height: 150,
    marginTop: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppStyle.BGColor.White,
  },
  emojiItem: {
    width: (AppStyle.Screen.FullWidth - 10) * 0.2,
    height: 70,
    alignItems: 'center',
  },
  boxEmoji: {
    flexDirection: 'row',
    width: 45,
    height: 45,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  emojiStyle: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  txtEmoji: {
    fontWeight: '600',
    fontSize: 14,
  },
  boxBtn: {
    width: AppStyle.Screen.FullWidth,
    height: 100,
    bottom: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
  btnSave: {
    width: AppStyle.Screen.FullWidth * 0.4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 0.5,
  },
  txtBtn: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
