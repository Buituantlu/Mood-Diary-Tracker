import {StyleSheet, Platform, StatusBar} from 'react-native';
import AppStyle from './app.style';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

export const heightStatusBar =
  Platform.OS === 'android' ? 0 : getStatusBarHeight(true);
export const heightHeader = 56 + heightStatusBar;
export const heightFooter = getBottomSpace();

export const commonStyles = StyleSheet.create({
  headerTitleLarger: {
    color: AppStyle.TextColor.Primary,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: AppStyle.Text.Large,
  },
  headerTitle: {
    color: AppStyle.TextColor.White,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: AppStyle.Text.Medium2,
    fontFamily: 'Quicksand-Bold',
  },
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: AppStyle.BGColor.White,
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: AppStyle.BGColor.White,
  },
  headerImage: {
    width: AppStyle.Screen.FullWidth / 7,
    height: '100%',
    resizeMode: 'contain',
  },
  headerWithCoin: {
    color: AppStyle.BGColor.White,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: AppStyle.Text.Normal,
    marginRight: 4,
  },
});
