import {StyleSheet} from 'react-native';
import AppStyle from '../../../shared/ui/styles/app.style';
const styles = StyleSheet.create({
  container: {
    width: AppStyle.Screen.FullWidth - 16,
    marginHorizontal: 8,
  },
  txtPromise: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  btnPromise: {
    height: 50,
    width: AppStyle.Screen.FullWidth - 32,
    borderRadius: 30,

    marginHorizontal: 8,
    marginTop: 32,
  },
  txtCenterElement: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  leftElementStyle: {
    width: 15,
    height: 15,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: 10,
    marginTop: 16,
  },
  iconInput: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  input: {
    height: 80,
    flex: 1,
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
  btnIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  viewIcColor: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtIcColor: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
    paddingLeft: 16,
  },
  viewSecond: {
    flexDirection: 'row',
    marginVertical: 32,
    height: 60,
    alignItems: 'center',
  },
  viewThird: {
    height: 240,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  containerItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imgItem: {
    height: 30,
    width: 30,
  },
  viewContent: {
    paddingLeft: 10,
    height: 60,
    width: AppStyle.Screen.FullWidth - 86,
  },
  txtField: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
  },
  txtContent: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
  },
  line: {
    height: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(89, 89, 89, 0.7)',
  },
  modalView: {
    height: AppStyle.Screen.FullHeight / 2,
    width: AppStyle.Screen.FullWidth - 16,
    borderRadius: 10,
  },
  reminder: {
    height: 60,
    width: AppStyle.Screen.FullWidth - 86,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  btnItemIcon: {
    height: (AppStyle.Screen.FullWidth - 16) / 4,
    width: (AppStyle.Screen.FullWidth - 16) / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItemIcon: {
    height: '70%',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  imgTick: {
    position: 'absolute',
    height: 20,
    width: 20,
    bottom: 0,
    right: 0,
  },
  iconModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: AppStyle.Screen.FullHeight / 2 - 40,
  },
  txtLikeIcon: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  txtItem: {
    flexDirection: 'row',
    height: 59,
    alignItems: 'center',
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewColors: {
    height: 200,
    width: AppStyle.Screen.FullWidth - 16,
    borderRadius: 10,
  },
  iconRight: {
    height: 12,
    width: 8,
    marginLeft: 10,
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  selectColor: {
    width: (AppStyle.Screen.FullWidth - 16) / 3,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  promise: {
    height: 50,
    width: AppStyle.Screen.FullWidth - 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
