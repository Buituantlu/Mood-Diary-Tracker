import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';

interface ItemActivitiesProps {
  moodStore: MoodStore;
  item: any;
  isEdit?: boolean;
  mood?: any;
  uiStore: UIStore;
}
const ItemActivities = observer(
  ({item, moodStore, isEdit, mood, uiStore}: ItemActivitiesProps) => {
    const [isSelect, setIsSelect] = useState(false);

    const onClick = () => {
      if (item.id === 1) {
        moodStore.hideShowModalAddIcon(true);
      }
      if (isSelect === false) {
        moodStore.setArrActivitiesObject({
          id: item.id,
          image: item.image,
          name: item.name,
          type: item.type,
        });
      } else {
        moodStore.removeActivityFollowID(item.id);
      }
      setIsSelect(!isSelect);
    };
    React.useEffect(() => {
      if (isEdit) {
        if (mood?.activitiesObj) {
          mood?.activitiesObj.length > 0 &&
            mood?.activitiesObj.forEach(element => {
              if (element?.id == item.id) {
                setIsSelect(true);
              }
            });
        } else {
          return;
        }
      }
    }, []);
    return (
      <TouchableOpacity onPress={onClick} style={styles.container}>
        <View
          style={[
            styles.imgIcon,
            {backgroundColor: isSelect ? 'white' : undefined},
          ]}>
          <Image
            style={[
              {width: item?.id == 1 ? AppStyle.Screen.FullWidth / 7 : 28},
              {resizeMode: 'contain'},
              {
                tintColor:
                  item.id == 1
                    ? undefined
                    : isSelect
                    ? uiStore.bgMode == 'light'
                      ? AppStyle.BgMood.Rad
                      : AppStyle.BGColor.BlueSky
                    : undefined,
              },
            ]}
            source={
              item.id == 1 ? item.image : moodStore.getIconFollowImg(item.image)
            }
          />
        </View>
        <Text style={styles.txtBtn}>{i18n.t(item.name)}</Text>
      </TouchableOpacity>
    );
  },
);

export default ItemActivities;

const styles = StyleSheet.create({
  container: {
    height: AppStyle.Screen.FullHeight / 6,
    width: AppStyle.Screen.FullWidth / 5,
    alignItems: 'center',
    paddingTop: AppStyle.Screen.FullHeight / 20,
  },
  imgIcon: {
    height: AppStyle.Screen.FullWidth / 7,
    width: AppStyle.Screen.FullWidth / 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  txtBtn: {
    paddingTop: 4,
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
  },
});
