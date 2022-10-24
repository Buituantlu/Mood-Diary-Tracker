import {observer} from 'mobx-react';
import React from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import {
  IC_BASE_AWFUL,
  IC_BASE_BAD,
  IC_BASE_GOOD,
  IC_BASE_MEH,
  IC_BASE_RAD,
} from '../../../../utils/icons';
import MoodStore from '../../../store/moodStore';
import AppStyle from '../../styles/app.style';
import {ButtonMood} from './mood_item';

interface ListMoodProps {
  moodStore: MoodStore;
}

const ListMood = observer(({moodStore}: ListMoodProps) => {
  const listMoods: Array<ImageSourcePropType> = [
    IC_BASE_RAD,
    IC_BASE_GOOD,
    IC_BASE_MEH,
    IC_BASE_BAD,
    IC_BASE_AWFUL,
  ];

  return (
    <View style={styles.container}>
      {listMoods.map((e, idx) => (
        <ButtonMood
          key={idx}
          icon={e}
          isSelected={moodStore.isSelect === idx + 1}
          onPress={() => moodStore.selectMood(idx + 1)}
        />
      ))}
    </View>
  );
});

export default ListMood;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: AppStyle.Screen.FullWidth - 36,
  },
});
