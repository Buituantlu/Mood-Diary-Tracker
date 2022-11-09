import {observer} from 'mobx-react';
import React, {useState} from 'react';
import axios from 'axios';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  IC_BACK_REPLY,
  IC_SEARCH,
  IC_TICK_ANIMATION,
} from '../../../utils/icons';
import MoodStore from '../../store/moodStore';
import UIStore from '../../store/ui';
import AppStyle from '../styles/app.style';
import {heightStatusBar, heightFooter} from '../styles/common.style';
import FastImage from 'react-native-fast-image';
const URL_ICONS = 'https://search.icons8.com/api/iconsets/v5/search?';

interface AddIconProps {
  moodStore: MoodStore;
  uiStore: UIStore;
}

const AddIcon = observer(({moodStore, uiStore}: AddIconProps) => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(0);
  const [indexItem, setIndexItem] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [getApi, setGetApi] = useState(false);
  const [data, setData] = useState<Array<any>>([]);
  const onBack = () => {
    moodStore.hideShowModalAddIcon(false);
  };
  const onClick = () => {
    moodStore.hideShowModalAddIcon(false);
  };

  const onSearch = () => {
    setLoading(true);
    setPage(page + 40);
    axios
      .get(`${URL_ICONS}`, {
        params: {
          term: text,
          amount: page,
          platform: 'ios_filled',
        },
      })
      .then(function (response) {
        setLoading(false);
        setData(response.data.icons);
        console.log('data', response.data);
      })
      .catch(function (error) {
        uiStore.showToast('Search error, try again!');
        setLoading(false);
      })
      .finally(function () {
        setLoading(false);
        // always executed
      });
  };

  const onClickItem = index => {
    setIndexItem(index);
  };

  const loadMoreData = () => {
    setLoading(true);
    setGetApi(true);
    if (getApi) {
      fetch(URL_ICONS + `${text}`)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setPage(page + 40);
          setGetApi(false);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          setGetApi(false);
          console.error(error);
        });
    }
  };
  return (
    <Modal
      animationIn="slideInLeft"
      animationInTiming={1000}
      animationOut="slideOutRight"
      animationOutTiming={500}
      avoidKeyboard={true}
      style={{marginHorizontal: 0, marginVertical: 0}}
      isVisible={moodStore.isModalAddIcon}>
      <View style={styles.container}>
        <View
          style={[
            styles.content,
            {
              backgroundColor:
                uiStore?.bgMode === 'light'
                  ? AppStyle.MoreColors.White
                  : AppStyle.BGColor.Dark,
            },
          ]}>
          <View style={styles.viewHeader}>
            <TouchableOpacity onPress={onBack}>
              <Image
                style={[
                  styles.icBack,
                  {
                    tintColor:
                      uiStore.bgMode == 'dark'
                        ? '#FCFCFC'
                        : AppStyle.BGColor.BGMainDark,
                  },
                ]}
                source={IC_BACK_REPLY}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClick}>
              <Image style={styles.icBack} source={IC_TICK_ANIMATION} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', flex: 1}}>
            <View style={styles.viewSearch}>
              <TextInput
                style={styles.input}
                onChangeText={e => {
                  setText(e);
                }}
                placeholder={'Search icon ...'}
                placeholderTextColor={
                  uiStore.bgMode == 'dark'
                    ? AppStyle.MoreColors.ThumbDeactived
                    : AppStyle.BGColor.Gray
                }
              />
              <TouchableOpacity onPress={onSearch} style={styles.btnSearch}>
                <FastImage style={styles.icSearch} source={IC_SEARCH} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <FlatList
                  data={data}
                  numColumns={4}
                  contentContainerStyle={{paddingBottom: heightFooter}}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  onEndReached={loadMoreData}
                  onEndReachedThreshold={0.1}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onClickItem(index)}
                        style={[
                          styles.btnIcon,
                          index === indexItem
                            ? {borderWidth: 2, borderColor: '#000'}
                            : undefined,
                        ]}>
                        <FastImage
                          style={styles.icon}
                          source={{
                            uri: `https://img.icons8.com/${item.commonName}`,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default AddIcon;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: AppStyle.Screen.FullWidth,
    paddingHorizontal: 16,
    paddingTop: heightStatusBar,
  },
  icBack: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  icSearch: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  viewSearch: {
    height: 60,
    width: AppStyle.Screen.FullWidth - 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  input: {
    height: 60,
    width: (AppStyle.Screen.FullWidth - 32) * 0.85,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
  },
  btnSearch: {
    height: 48,
    width: 48,
    backgroundColor: '#18a0fb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnIcon: {
    height: (AppStyle.Screen.FullWidth - 48) / 4,
    width: (AppStyle.Screen.FullWidth - 48) / 4,
    margin: 4,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
