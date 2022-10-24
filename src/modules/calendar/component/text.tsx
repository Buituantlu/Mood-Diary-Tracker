import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import UIStore from '../../../shared/store/ui';
import AppStyle from '../../../shared/ui/styles/app.style';

interface BaseTextProps {
  style?: any;
  text: string;
  uiStore: UIStore;
}

const BaseText = observer(({text, style, uiStore}: BaseTextProps) => {
  return (
    <Text
      style={[
        style,
        {
          color:
            uiStore.bgMode === 'light'
              ? AppStyle.TextColor.Black
              : AppStyle.TextColor.White,
        },
      ]}>
      {text}
    </Text>
  );
});

export default BaseText;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Quicksand-SemiBold',
  },
});
