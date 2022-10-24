import {StyleSheet, Dimensions} from 'react-native';
import AppStyle from '../../../shared/ui/styles/app.style';
import {heightFooter} from '../../../shared/ui/styles/common.style';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icMood: {
    height: width / 9,
    width: width / 9,
  },
  icHeader: {
    width: 25,
    height: 25,
    tintColor: AppStyle.BGColor.BlueSky,
  },
  btnSave: {
    height: 24,
    width: width / 3.2,
    borderRadius: 20,
    borderColor: AppStyle.BGColor.BlueSky,
    borderWidth: 1,
    opacity: 0.9,
  },
  contentFooter: {
    borderRadius: 15,
    height: width / 2,
    marginHorizontal: 4,
    borderColor: '#85929E',
    borderWidth: 0.8,
    alignItems: 'center',
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width - 120,
    marginTop: 24,
  },
  containerDay: {
    height: AppStyle.Screen.FullHeight / 3.4,
    marginTop: 4,
  },
  containerDays: {
    height: AppStyle.Screen.FullHeight / 24,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  imgDream: {
    width: width / 2.3,
    height: width / 2.5,
    marginBottom: width / 4,
  },
  imgDownload: {
    width: width / 8,
    height: width / 7,
    position: 'absolute',
    bottom: width / 3.5,
  },
  containerImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerListMonth: {
    flexGrow: 1,
    paddingBottom: heightFooter + 58,
  },
  txtDay: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  },
});

export default styles;
