import {makeAutoObservable} from 'mobx';
import {PixelRatio} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {getUser, postRegister} from '../../services/api/api_key';
import {get, post} from '../../services/api/index';
import {getObjectDataLocal, saveObjectDataLocal} from '../../services/storage';
import {UserType} from '../type/user';

export const LOCAL_USER_KEY = 'LOCAL_USER_KEY';

export default class UserStore {
  user: UserType = {
    device_id: '',
    device_code: '',
    subscription_status: false,
    country: 'VN',
    avatar: '',
    nickname: '',
    color_user: '',
    is_check_notification: undefined,
    automaticDarkMode: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async setUserLocal(user: UserType) {
    // this.user = user;
    saveObjectDataLocal(LOCAL_USER_KEY, user);
  }

  createUser = async () => {
    const result = await post(postRegister(), {
      device_id: getUniqueId(),
    });

    console.log('createUser: ', JSON.stringify(result));
    if (!result.error) {
      await this.getUserInfo();
      return {
        error: undefined,
      };
    } else {
      return {
        error: result.error,
      };
    }
  };

  createInforUser = data => {
    this.user.avatar = data.avatar;
    this.user.color_user = data.color_user;
    this.user.nickname = data.nickname;
  };

  setFCMToken = async (token: string) => {
    let newUser = {...this.user};
    newUser.fcm_token = token;
    this.user = {...newUser};
    await this.setUserLocal(this.user);
  };

  getUserInfo = async () => {
    const result = await get(getUser(), {device_id: getUniqueId()});
    console.log('getUserInfo: ', JSON.stringify(result));

    if (!result.error && result.res.data) {
      const curUser = result.res.data as UserType;
      curUser.fcm_token = this.user.fcm_token;
      // curUser.subscription_status = true;
      this.setUserLocal(curUser);
    }
  };

  getUser = async () => {
    const result = await getObjectDataLocal(LOCAL_USER_KEY);
    result == undefined ? null : (this.user = result);
  };
}
