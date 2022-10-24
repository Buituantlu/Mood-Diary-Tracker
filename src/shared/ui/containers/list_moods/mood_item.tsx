import React from 'react';
import {
  ImageSourcePropType,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {IC_TICK} from '../../../../utils/icons';
import AppStyle from '../../styles/app.style';

type ButtonMoodProps = {
  icon: ImageSourcePropType;
  isSelected: boolean;
  onPress: () => void;
};

export const ButtonMood = ({icon, isSelected, onPress}: ButtonMoodProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={[styles.iconMood, {opacity: isSelected ? 1 : 0.4}]}
        source={icon}
      />
      {isSelected ? <Image source={IC_TICK} style={styles.icTick} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconMood: {
    paddingTop: 20,
    height: AppStyle.Screen.FullWidth / 7 - 13,
    width: AppStyle.Screen.FullWidth / 7 - 13,
  },
  icTick: {
    borderRadius: 50,
    height: 15,
    width: 15,
    borderColor: 'white',
    borderWidth: 1.5,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
