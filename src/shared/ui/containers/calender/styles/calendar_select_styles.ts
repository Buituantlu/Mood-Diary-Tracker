import {StyleSheet, Dimensions} from 'react-native';
import AppStyle from '../../../styles/app.style';
const {width, height} = Dimensions.get('window');
const screenWidth = width < height ? width : height;

export default StyleSheet.create({
  containerCalendar: {
    height: AppStyle.Screen.FullHeight / 2.1,
  },
  day: {
    fontSize: 13,
    fontFamily: 'Quicksand-Bold',
    width: '35%',
    textAlign: 'center',
  },
  txtHeaderDate: {
    color: AppStyle.BGColor.White,
    fontSize: 18,
  },
  weekdays: {
    width: screenWidth / 7,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  },
  txt: {
    borderColor: AppStyle.MoreColors.LightGray,
    borderWidth: 0.4,
    width: width / 7,
  },
  warpDay: {
    height: AppStyle.Screen.FullHeight / 11,
    width: screenWidth / 7,
    borderColor: AppStyle.MoreColors.LightGray,
    borderWidth: 0.4,
  },
  txtWeeks: {
    flexDirection: 'row',
  },
  countMood: {
    position: 'absolute',
    right: 1,
    bottom: 0,
  },
  txtCount: {
    zIndex: 1,
    color: 'white',
    fontSize: 11,
    fontFamily: 'Quicksand-Bold',
    right: 2,
  },
  triangle: {
    position: 'absolute',
    height: 22,
    width: 22,
    bottom: 0,
    right: 0,
  },
  containerDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
