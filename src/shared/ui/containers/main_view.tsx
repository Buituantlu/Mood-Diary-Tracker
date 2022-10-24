import {observer} from 'mobx-react';
import * as React from 'react';
import {View, StyleSheet, ViewProps, StyleProp, ViewStyle} from 'react-native';
import UIStore from '../../store/ui';
import AppStyle from '../styles/app.style';

interface MainViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  childView: JSX.Element;
  uiStore: UIStore;
}

const MainView = observer(
  ({containerStyle, childView, uiStore}: MainViewProps) => {
    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            backgroundColor:
              uiStore?.bgMode === 'light'
                ? AppStyle.BGColor.BGMain
                : AppStyle.BGColor.Dark,
          },
        ]}>
        {childView}
      </View>
    );
  },
);

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
