import {NativeModules, PermissionsAndroid, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {getDataLocal} from '../storage';
import {DOWNLOAD_ONLY_OVER_WIFI_KEY} from '../../utils/constants';
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';
import CameraRoll from '@react-native-community/cameraroll';

export const saveToGallery = async (imgUrl: string) => {
  console.log('saveToGallery: ', imgUrl);
  let state = await NetInfo.fetch();
  const onlyWifi = await getDataLocal(DOWNLOAD_ONLY_OVER_WIFI_KEY);
  if (state.type !== 'wifi' && onlyWifi === 'true') return;
  const permission = await requestWriteStoragePermission();
  let newImgUri = imgUrl.lastIndexOf('/');
  let imageName = imgUrl.substring(newImgUri);
  let dirs = ReactNativeBlobUtil.fs.dirs;
  let path =
    Platform.OS === 'ios'
      ? dirs.MainBundleDir + imageName
      : dirs.DownloadDir + imageName;
  ReactNativeBlobUtil.fs.exists(path).then(exist => {
    if (exist) {
      ReactNativeBlobUtil.fs.unlink(path);
    }
  });
  console.log('saveToGallery: ', path);
  if (Platform.OS === 'android') {
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      let config: ReactNativeBlobUtilConfig = {
        fileCache: true,
        appendExt: imgUrl.split('.').pop(),
        wifiOnly: onlyWifi === 'true',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image',
        },
      };
      let response = await ReactNativeBlobUtil.config(config).fetch(
        'GET',
        imgUrl,
      );
      NativeModules.WallpaperModule.addPicToGallery(response.path());
    } else {
      return;
    }
  } else {
    await CameraRoll.save(imgUrl);
  }
};

export const saveToWallpaper = async (
  imgUrls: string[],
  type: 'image' | 'video' | 'double' | 'parallax',
  typeWp?: 'HOME' | 'LOCK' | 'BOTH',
) => {
  console.log('saveToWallpaper: ', imgUrls);

  let state = await NetInfo.fetch();
  const onlyWifi = await getDataLocal(DOWNLOAD_ONLY_OVER_WIFI_KEY);
  if (state.type !== 'wifi' && onlyWifi === 'true') return [];

  const permission = await requestWriteStoragePermission();
  if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
    return [];
  }
  let arrPromise: Array<Promise<FetchBlobResponse>> = [];
  imgUrls.forEach((imgUrl, index) => {
    let imageName = '';
    let imageExtend = imgUrl.split('.').pop();
    switch (type) {
      case 'image':
        imageName = type + typeWp + '.' + imageExtend;
        break;
      case 'video':
        imageName = type + '.' + imageExtend;
        break;
      case 'double':
        imageName = type + index + '.' + imageExtend;
        break;
      case 'parallax':
        imageName = type + index + '.' + imageExtend;
        break;
    }
    let dirs = ReactNativeBlobUtil.fs.dirs;
    let path = dirs.SDCardDir + '/wallpaper/' + imageName;
    ReactNativeBlobUtil.fs.exists(path).then(exist => {
      if (exist) {
        ReactNativeBlobUtil.fs.unlink(path);
      }
    });

    console.log('path: ', path);
    let config: ReactNativeBlobUtilConfig = {
      overwrite: true, // not work???
      fileCache: true,
      appendExt: imageExtend,
      wifiOnly: onlyWifi === 'true',
      indicator: true,
      IOSBackgroundTask: true,
      path: path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: type,
      },
    };
    arrPromise.push(ReactNativeBlobUtil.config(config).fetch('GET', imgUrl));
  });
  let arrRes = await Promise.all(arrPromise);
  return arrRes;
};

export const requestWriteStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write data to storage',
        message: 'App require needs access to phone storage to download Image',
        buttonNeutral: 'Ask me later',
        buttonPositive: 'OK',
        buttonNegative: 'No',
      },
    );
    return granted;
  } catch (e) {
    console.log('request permission ', e);
  }
};
