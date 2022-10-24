import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainView from '../../../shared/ui/containers/main_view';
import UIStore from '../../../shared/store/ui';
import MoodStore from '../../../shared/store/moodStore';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import BaseHeader from '../../../shared/ui/containers/base_header';
import {ic_arrow_left_orange} from '../../../utils/icons';
import AppStyle from '../../../shared/ui/styles/app.style';
import _ from 'lodash';
import moment from 'moment';
import i18n from '../../../utils/i18n';
import {FlatList} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

interface PhotoScreenProps {
  uiStore: UIStore;
  moodStore: MoodStore;
  navigation: NavigationProp<ParamListBase>;
}

const PhotoScreen = ({uiStore, navigation, moodStore}: PhotoScreenProps) => {
  const data = moodStore.arrMoods.map(item => item.image).flat();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');

  const arrLast = [];

  const arrMoodSort = moodStore.arrMoods.sort((x, y) => {
    return y.createTime - x.createTime;
  });

  const handleData = arr => {
    arr.forEach(item => {
      let idx = arrLast.findIndex(
        el => el.month == new Date(item.createTime).getMonth() + 1,
      );
      if (idx == -1) {
        arrLast.push({
          month: new Date(item.createTime).getMonth() + 1,
          time: item.createTime,
          arrImage: item.image.map(element => {
            return {
              image: element,
              date: new Date(item.createTime).getDate(),
            };
          }),
        });
      }
      if (idx != -1) {
        const arrImg = arrLast[idx].arrImage.concat(
          item.image.map(element => {
            return {
              image: element,
              date: new Date(item.createTime).getDate(),
            };
          }),
        );
        arrLast[idx].arrImage = arrImg;
      }
    });
  };

  handleData(arrMoodSort);

  const Item = ({time, arrImage}) => {
    return (
      <View>
        <Text style={styles.textTime}>{moment(time).format('YYYY. MMM')}</Text>
        <View style={styles.wrapper}>
          <FlatList
            data={arrImage}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity
                    // key={idx}
                    onPress={() => {
                      setImage(item.image);
                      setModalVisible(true);
                    }}>
                    <View style={styles.boxImage}>
                      <FastImage
                        style={styles.imageStyle}
                        source={{uri: item?.image}}
                      />
                      <Text style={styles.textImage}>{item.date}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <MainView
      childView={
        <View style={styles.container}>
          <BaseHeader
            containerStyle={styles.header}
            leftElement={
              <Image
                style={[
                  styles.leftElementStyle,
                  {
                    tintColor:
                      uiStore.bgMode === 'light'
                        ? AppStyle.MoreColors.OrangeMain
                        : AppStyle.MoreColors.BlueMain,
                  },
                ]}
                source={ic_arrow_left_orange}
              />
            }
            leftAction={() => navigation.goBack()}
            centerElement={
              <Text style={styles.centerElementStyle}>{`${i18n.t(
                'settings.photos',
              )}: ${data.length}`}</Text>
            }
          />
          <View style={styles.scrollViewStyle}>
            <FlatList
              data={arrLast}
              renderItem={({item}) => {
                return <Item time={item.time} arrImage={item.arrImage} />;
              }}
            />
          </View>

          <Modal
            statusBarTranslucent={true}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <ImageBackground style={styles.modalView} source={{uri: image}}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <FastImage
                    source={require('../../../assets/icons/ic_close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </Modal>
        </View>
      }
      uiStore={uiStore}
    />
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {},
  leftElementStyle: {
    width: 20,
    height: 20,
  },
  centerElementStyle: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  scrollViewStyle: {
    flex: 1,
  },
  textTime: {
    fontFamily: 'Quicksand-SemiBold',
    marginLeft: 8,
  },
  wrapper: {
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 10,
    flexDirection: 'row',
    width: AppStyle.Screen.FullWidth,
  },
  imageStyle: {
    borderRadius: 8,
    width: AppStyle.Screen.FullWidth / 3 - 10,
    height: AppStyle.Screen.FullWidth / 3 - 10,
  },
  boxImage: {
    marginTop: 10,
    marginLeft: 8,
    width: AppStyle.Screen.FullWidth / 3 - 10,
    height: AppStyle.Screen.FullWidth / 3 - 10,
  },
  textImage: {
    right: 5,
    bottom: 5,
    width: 20,
    height: 20,
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'Quicksand-SemiBold',
    color: AppStyle.MoreColors.White,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
  closeBtn: {
    top: 20,
    right: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'flex-end',
    position: 'absolute',
    backgroundColor: AppStyle.MoreColors.White,
  },
});
