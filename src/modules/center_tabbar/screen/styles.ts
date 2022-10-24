import {Platform, StyleSheet} from 'react-native';
import AppStyle from '../../../shared/ui/styles/app.style';

const styles = StyleSheet.create({
  rightIcon: {
    width: 36,
    resizeMode: 'contain',
  },
  leftIcon: {
    width: 36,
    resizeMode: 'contain',
  },
  centerIcon: {
    width: 48,
    height: 48,
  },
  txtDoing: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    color: AppStyle.TextColor.White,
    fontSize: 26,
    paddingHorizontal: 50,
  },
  addIcon: {
    width: AppStyle.Screen.FullWidth / 10,
    resizeMode: 'contain',
  },
  btnAddImage: {
    height: AppStyle.Screen.FullHeight / 5.5,
    width: AppStyle.Screen.FullWidth / 4.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 12,
  },
  txtAddImage: {
    fontSize: 14,
    color: 'black',
  },
  txtDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  boxDate: {
    width: AppStyle.Screen.FullWidth * 0.7,
    height: 50,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 52, 52, 0.15)',
  },
  listMood: {
    height: AppStyle.Screen.FullHeight / 16,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: AppStyle.Screen.FullHeight / 20,
  },
  icDown: {
    height: 10,
    width: 10,
    tintColor: 'white',
    marginLeft: 10,
  },
  btnInput: {
    backgroundColor: '#FFF',
    height: AppStyle.Screen.FullHeight / 16,
    borderRadius: 30,
    marginHorizontal: 12,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  containerInput: {
    borderRadius: 30,
    marginHorizontal: 12,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'red',
  },
  input: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  },
  viewActivity: {
    height: AppStyle.Screen.FullHeight / 2.8,
    paddingTop: 12,
  },
  image: {
    height: AppStyle.Screen.FullHeight / 5.5,
    width: AppStyle.Screen.FullWidth / 4.5,
    borderRadius: 8,
    resizeMode: Platform.OS == 'ios' ? 'stretch' : 'contain',
  },
  imgDream: {
    width: AppStyle.Screen.FullWidth / 2.3,
    height: AppStyle.Screen.FullWidth / 2.5,
    marginBottom: AppStyle.Screen.FullWidth / 3,
    resizeMode: 'contain',
  },
  imgDownload: {
    width: AppStyle.Screen.FullWidth / 8,
    height: AppStyle.Screen.FullWidth / 7,
    tintColor: 'white',
  },
  containerImg: {
    flex: 1,
    alignItems: 'center',
  },
  btnEdit: {
    height: AppStyle.Screen.FullHeight / 16,
    width: AppStyle.Screen.FullWidth - 80,
    marginHorizontal: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  txtEdit: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: 'white',
  },
  btnDelete: {
    position: 'absolute',
    left: 0,
  },
  imgDelete: {
    borderRadius: 50,
    height: 20,
    width: 20,
  },
  listImage: {
    flexDirection: 'row',
    marginTop: 20,
    height: AppStyle.Screen.FullHeight / 3,
    flexGrow: 1,
  },
  containerDatepicker: {
    alignItems: 'center',
    height: AppStyle.Screen.FullHeight / 6,
  },
});

export default styles;
