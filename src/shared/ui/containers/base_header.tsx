import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {heightHeader, heightStatusBar} from '../styles/common.style';
import {observer} from 'mobx-react';

type BaseHeaderProps = {
  leftElement?: any;
  rightElement?: any;
  centerElement?: any;
  leftAction?: () => void;
  rightAction?: () => void;
  centerAction?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const BaseHeader: React.FC<BaseHeaderProps> = observer(
  ({
    leftElement,
    rightElement,
    centerElement,
    leftAction,
    rightAction,
    centerAction,
    containerStyle,
  }: BaseHeaderProps) => {
    return (
      <View style={[containerStyle, styles.container]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={leftAction}
            style={styles.buttonLeft}
            activeOpacity={0.1}>
            {leftElement ? leftElement : <View />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={centerAction}
            style={styles.button}
            activeOpacity={1}>
            {centerElement}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={rightAction}
            style={styles.buttonRight}
            activeOpacity={0.1}>
            {rightElement ? rightElement : <View />}
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default BaseHeader;

const styles = StyleSheet.create({
  container: {
    height: heightHeader,
    width: '100%',
    zIndex: 1,

    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingBottom: 16,
    paddingTop: heightStatusBar,
  },
  headerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonLeft: {
    position: 'absolute',
    height: '100%',

    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  buttonRight: {
    position: 'absolute',
    height: '100%',

    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
});
