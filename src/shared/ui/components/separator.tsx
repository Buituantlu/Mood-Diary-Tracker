import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import AppStyle from '../styles/app.style';

interface SeparatorProps {
  height?: number;
  color?: any;
}

const Separator = ({height, color}: SeparatorProps) => {
  return (
    <View
      style={[
        styles.separatorLine,
        {
          height: height ?? 1,
          backgroundColor: color || AppStyle.MoreColors.LightGray,
        },
      ]}
    />
  );
};

export default Separator;

const styles = StyleSheet.create({
  separatorLine: {
    width: '100%',
  },
});
