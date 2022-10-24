import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';
import BaseText from '../component/text';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import FastImage from 'react-native-fast-image';
const {width} = Dimensions.get('window');

interface ListMoodFollowDayProps {
  listDay: any;
  moodStore: MoodStore;
  uiStore: UIStore;
  navigation: NavigationProp<ParamListBase>;
}

const ListMoodFollowDay = observer(
  ({moodStore, listDay, uiStore, navigation}: ListMoodFollowDayProps) => {
    const [height, setHeight] = useState(0);
    const onEdit = () => {
      moodStore.arrMoodsFollowMonth.splice(0);
      navigation.navigate('CenterTabBar', {
        screen: 'EditMoodScreen',
        params: {
          mood: listDay,
        },
      });
    };
    return (
      <TouchableOpacity style={{paddingBottom: 6}} onPress={onEdit}>
        <ImageBackground
          style={[
            styles.imgBg,
            {opacity: uiStore.bgMode === 'light' ? 0.5 : 1},
            {
              height: height,
            },
          ]}
          imageStyle={{borderRadius: 8}}
          source={moodStore.getImageBGFollowType(listDay.moodType)}
        />
        <View
          onLayout={event => {
            let {height} = event.nativeEvent.layout;
            setHeight(height);
          }}>
          <View style={styles.containerMood}>
            <View style={styles.btnMood}>
              <Image
                style={styles.icMood}
                source={moodStore.getImageFollowType(listDay.moodType)}
              />
              <View style={styles.containerTxt}>
                <BaseText
                  uiStore={uiStore}
                  style={styles.txtMood}
                  text={i18n.t(listDay.inputName.toLowerCase())}
                />
                {listDay?.activitiesObj && (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.hashtag}>
                    {listDay?.activitiesObj.map(e => {
                      return (
                        <Text
                          key={e.id}
                          style={{fontFamily: 'Quicksand-Regular'}}>
                          {i18n.t(e.name)}{' '}
                        </Text>
                      );
                    })}
                  </Text>
                )}
              </View>
            </View>
            <BaseText
              uiStore={uiStore}
              style={styles.txtTime}
              text={
                CommonFn.hh(listDay.createTime) +
                ':' +
                CommonFn.mm(listDay.createTime)
              }
            />
          </View>
          <View
            style={{
              marginLeft: AppStyle.Screen.FullWidth / 7,
            }}>
            <View>
              {listDay.description && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.txtDes}>
                  {listDay.description}
                </Text>
              )}
            </View>
            <View style={styles.imageMood}>
              {listDay.image &&
                listDay.image.map(e => {
                  return (
                    <FastImage
                      key={e.toString()}
                      style={styles.image}
                      source={{uri: e}}
                    />
                  );
                })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default ListMoodFollowDay;

const styles = StyleSheet.create({
  icMood: {
    height: width / 7 - 13,
    width: width / 7 - 13,
  },
  btnMood: {
    flex: 1,
    flexDirection: 'row',
  },
  txtMood: {
    fontSize: 22,
    fontFamily: 'Quicksand-SemiBold',
    marginLeft: 15,
  },
  txtTime: {
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
    paddingBottom: 22,
  },
  hashtag: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  imgBg: {
    width: AppStyle.Screen.FullWidth - 8,
    position: 'absolute',
    left: 4,
  },
  containerMood: {
    flexDirection: 'row',
    height: width / 7 + 13,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    height: AppStyle.Screen.FullHeight / 8,
    width: AppStyle.Screen.FullWidth / 4.5,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  containerTxt: {
    justifyContent: 'center',
    flex: 1,
  },
  txtDes: {
    bottom: 8,
    fontFamily: 'Quicksand-Regular',
    fontSize: 20,
    marginLeft: 12,
    marginRight: 8,
  },
  imageMood: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
