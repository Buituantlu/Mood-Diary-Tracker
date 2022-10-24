import {makeAutoObservable} from 'mobx';
import {
  getObjectDataLocal,
  saveObjectDataLocal,
} from '../../../services/storage';
import {ChallengeStoreProps} from '../../challenge/store/challenge_type';

export const SAVE_NOTIFICATION = 'SAVE_NOTIFICATION';
export const SAVE_ARR_NOTI = 'SAVE_ARR_NOTI';

export default class NotificationStore {
  notification: boolean = false;
  arrNotiChallenge: Array<ChallengeStoreProps> = [];

  constructor() {
    makeAutoObservable(this);
    this.getNotification();
    this.getArrNotification();
  }

  setArrNoti(arr) {
    this.arrNotiChallenge.push(arr);
  }

  getRepeat(noti) {
    switch (noti) {
      case 'never':
        return 0;
      case 'every_day':
        return 1;
      case 'every_week':
        return 7;
      case 'every_month':
        return 30;
      case 'every_year':
        return 365;
      default:
        break;
    }
  }

  async getNotification() {
    let checkNoti = await getObjectDataLocal(SAVE_NOTIFICATION);
    if (checkNoti) {
      this.notification = checkNoti;
    }
  }

  async getArrNotification() {
    let arrNoti = await getObjectDataLocal(SAVE_ARR_NOTI);
    if (arrNoti) {
      this.arrNotiChallenge = arrNoti;
    }
  }

  async setNotification(bool: boolean) {
    this.notification = bool;
    await saveObjectDataLocal(SAVE_NOTIFICATION, bool);
    await saveObjectDataLocal(SAVE_ARR_NOTI, this.arrNotiChallenge);
  }
}
