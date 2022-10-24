import {makeAutoObservable} from 'mobx';
import {ChallengeStoreProps} from './challenge_type';
import * as commonFn from '../../../shared/ui/containers/calender/commonFn';
import {getObjectDataLocal} from '../../../services/storage';

export const SAVE_ARR_CHALLENGES = 'SAVE_ARR_CHALLENGES';
export default class ChallengeStore {
  arrChallenges: Array<ChallengeStoreProps> = [];
  spaceDay: number = 0;
  constructor() {
    makeAutoObservable(this);
    this.getArrChallenges();
  }

  async getArrChallenges() {
    let arrChallenge = await getObjectDataLocal(SAVE_ARR_CHALLENGES);
    if (arrChallenge) {
      this.arrChallenges = arrChallenge;
    }
  }

  addDateDone(date, id) {
    return this.arrChallenges.filter(item => {
      if (item.id == id) {
        item.arrDone.push(date);
      }
    });
  }

  removeDateDone(date, id) {
    return this.arrChallenges.filter(item => {
      if (item.id == id) {
        item.arrDone.filter((e, index) => {
          if (e == date) {
            item.arrDone.splice(index, 1);
          }
        });
      }
    });
  }

  mathDay(startDay, endDay) {
    this.spaceDay = endDay - startDay;
  }
  addChallenge(item) {
    this.arrChallenges.push(item);
  }
  getArrChallengeFollowMonth(month) {
    return this.arrChallenges.filter(
      e => commonFn.ym(e.endTime) === commonFn.ym(month),
    );
  }
  removeChallenge(id: number) {
    this.arrChallenges.splice(id, 1);
  }
}
