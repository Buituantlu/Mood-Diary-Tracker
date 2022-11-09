import firestore from '@react-native-firebase/firestore';
import {makeAutoObservable} from 'mobx';
import {getUniqueId} from 'react-native-device-info';
import ArrMoods from '../../assets/json/en/moods.json';
import * as commonFn from '../../shared/ui/containers/calender/commonFn';
import {
  BG_DARK_DEAD,
  BG_DARK_HAPPY,
  BG_DARK_LAUGHING,
  BG_DARK_NEUTRAL,
  BG_DARK_SAD,
  IC_ACCOMPLISHED,
  IC_ANNIVERSARY,
  IC_BAD_FOOD,
  IC_BASE_AWFUL,
  IC_BASE_BAD,
  IC_BASE_GOOD,
  IC_BASE_MEH,
  IC_BASE_RAD,
  IC_BORING_BOOK,
  IC_BORING_TRIP,
  IC_BUSY_DAY,
  IC_DATE_GONE_WRONG,
  IC_EXERCISE,
  IC_FAMILY_TIME,
  IC_FEEL_LONELY,
  IC_FREE_DAY,
  IC_GET_LOST,
  IC_GOOD_MEAL,
  IC_GOOD_READING,
  IC_GOOD_SLEEP,
  IC_GOT_INTO_ACCIDENT,
  IC_GOT_SICK,
  IC_GO_AS_PLANNED,
  IC_HAPPY_ANNIVERSARY,
  IC_HAVE_DATE,
  IC_HEARTBROKEN,
  IC_LACK_OF_SLEEP,
  IC_LOOSE_GAME,
  IC_MEET_DEADLINE,
  IC_MISSED_DEADLINE,
  IC_MONEY_SPENT,
  IC_NEW_HOBBY,
  IC_NOTHING_TO_DO,
  IC_NOT_PASSED,
  IC_NO_EXERCISE,
  IC_NO_PARTY,
  IC_PARTY_PARTY,
  IC_PASSED,
  IC_PLAN_CANCELED,
  IC_RISE_SHINE,
  IC_SAFE_TRIP,
  IC_SEE_DOCTOR,
  IC_SHOPPING,
  IC_SMALL_INJURY,
  IC_TASKS_DONE,
  IC_TRAVELING,
  IC_USELESS_DAY,
  IC_WIN_GAME,
  IC_WONDERFUL_TRIP,
  IC_WORK_OVERTIME,
} from '../../utils/icons';
import {ActivityObject, ActivityType} from '../type/activiti';
import {MoodType} from '../type/mood';
import AppStyle from '../ui/styles/app.style';

export const SAVE_MOODS = 'SAVE_MOODS';
export const ID_DEVICE = 'ID_DEVICE';

export default class MoodStore {
  dataMoods: Array<MoodType> = ArrMoods; // init array for moods (const);
  arrMoods: Array<MoodType> = [];
  idDevice: string = '';
  arrActivitiesObject: Array<ActivityObject> = [];
  arrActivitiesFollowMood: Array<ActivityType> = [];
  arrMoodsFollowMonth: Array<{data: Array<MoodType>; time: string}> = [];
  isSelect: number = 0;
  isModalAddIcon: boolean = false;
  arrMoodDay: Array<MoodType> = [];
  arrImage: Array<string> = [];
  curMood: Array<MoodType> = [];
  MonthLy: Array<{x: number; y: number}> = [];
  Average: Array<{day: number; data: Array<MoodType>}> = [];
  constructor() {
    makeAutoObservable(this);
    this.getArrMoods();
  }

  async getArrMoods() {
    // let checkMood = await getObjectDataLocal(SAVE_MOODS);
    // if (checkMood) {
    //   this.arrMoods = checkMood;
    // }
    let result = await getUniqueId();
    if (result) {
      this.idDevice = `${result}`;
    }
    firestore()
      .collection(`${this.idDevice}`)
      .onSnapshot(QuerySnapshot => {
        let result = QuerySnapshot._docs;
        let arrMoodF = [];
        if (result) {
          result.map(item => {
            arrMoodF.unshift(item._data);
          });
        }
        this.arrMoods = arrMoodF;
        console.log('tuaannnnStore', this.arrMoods.length);
      }, this.onError);
  }

  // onResult(QuerySnapshot) {
  //   console.log('Got Users collection result.', QuerySnapshot._docs);
  //   let result = QuerySnapshot._docs;
  //   let arrMoodF = [];
  //   if (result) {
  //     result.map(item => {
  //       arrMoodF.unshift(item._data);
  //     });
  //   }
  //   this.arrMoods = arrMoodF;
  //   console.log('tuaannnnStore', this.arrMoods.length);
  // }

  onError(error) {
    console.log('looi neeee', error);
  }

  getMoodDayFollowMonth() {
    this.arrMoodsFollowMonth.forEach(e => {
      let getTime = new Date(e.time);
      let getDay = getTime.getDay();
      let findMoodMax = e.data.reduce((prev, current) =>
        prev.id > current.id ? prev : current,
      );
      let index = this.Average.findIndex(a => a.day == getDay);
      if (index == -1) {
        this.Average.push({day: getDay, data: [findMoodMax]});
      } else {
        this.Average[index].data.push(findMoodMax);
      }
    });
  }

  hideShowModalAddIcon(bool: boolean) {
    this.isModalAddIcon = bool;
  }

  removeArrAverage() {
    this.Average.splice(0);
  }

  addMonthly(data) {
    this.MonthLy.push(data);
  }

  removeArrMonthly() {
    this.MonthLy.splice(0);
  }

  setArrActivitiesObject(_activity: any) {
    this.arrActivitiesObject.push(_activity);
  }

  addImage(image: string) {
    this.arrImage.push(image);
  }

  resetActiviti() {
    this.arrActivitiesObject = [];
  }

  resetArrImg() {
    this.arrImage = [];
  }

  setCurMood(mood: any) {
    this.curMood = mood;
  }

  addArrActivities(arr: any) {
    this.arrActivitiesObject = this.arrActivitiesObject.concat(arr);
  }

  addArrImage(image: any) {
    this.arrImage = this.arrImage.concat(image);
  }

  removeActivityFollowID(id: number) {
    this.arrActivitiesObject.filter((e, index) => {
      if (e.id === id) {
        this.arrActivitiesObject.splice(index, 1);
      }
    });
  }

  setArrMoodDay(listMood: Array<MoodType>) {
    this.arrMoodDay = listMood;
  }

  getMoodsFollowMonth(month: any): Array<MoodType> {
    return this.arrMoods.filter(e => commonFn.ym(e.createTime) === month);
  }

  getArrMoodFollowMonth(mood: any) {
    let index = this.arrMoodsFollowMonth.findIndex(
      e => commonFn.ymd(e.time) === commonFn.ymd(mood.createTime),
    );
    if (index == -1) {
      this.arrMoodsFollowMonth.push({
        time: commonFn.ymd(mood.createTime),
        data: [mood],
      });
    } else {
      this.arrMoodsFollowMonth[index].data.push(mood);
    }
    this.arrMoodsFollowMonth.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }

  // getArrActivitiesFollowMood(type: string) {
  //   this.arrActivitiesFollowMood.push({
  //     id: 1,
  //     type: 'AddActivity',
  //     name: 'Add New',
  //     image: IC_ADD,
  //   });
  //   ArrMoods.forEach(e => {
  //     if (e.moodType == type) {
  //       ArrActivities.forEach(a => {
  //         e.activities.forEach(element => {
  //           if (element == a.id) {
  //             this.arrActivitiesFollowMood.push(a);
  //           }
  //         });
  //       });
  //     }
  //   });
  // }

  // getArrActivitiesFree() {
  //   return ArrActivities.filter(e => e.id < 1000);
  // }

  getMoodsFollowDate(date: number): Array<MoodType> {
    return this.arrMoods.filter(
      e => commonFn.ymd(e.createTime) === commonFn.ymd(date),
    );
  }

  selectMood(select: number) {
    this.isSelect = select;
  }

  createMood(mood: any) {
    firestore()
      .collection(`${this.idDevice}`)
      .doc(`${mood.id}`)
      .set(mood)
      .then(() => {
        console.log('Mood added!');
      });
    // this.arrMoods.unshift(mood);
  }

  removeMood(id: number) {
    this.arrMoods.filter((e, idx) => {
      if (e.id == id) {
        this.arrMoods.splice(idx, 1);
      }
    });
  }

  getTypeFollowId(id: number) {
    switch (id) {
      case 0:
        return 'rad';
      case 1:
        return 'good';
      case 2:
        return 'meh';
      case 3:
        return 'bad';
      case 4:
        return 'awful';
      default:
        break;
    }
  }

  getNameFollowId(id: number) {
    switch (id) {
      case 0:
        return 'Rad';
      case 1:
        return 'Good';
      case 2:
        return 'Meh';
      case 3:
        return 'Bad';
      case 4:
        return 'Awful';
      default:
        break;
    }
  }

  getNameFollowType(type: string) {
    switch (type) {
      case 'rad':
        return 'Rad';
      case 'good':
        return 'Good';
      case 'meh':
        return 'Meh';
      case 'bad':
        return 'Bad';
      case 'awful':
        return 'Awful';
      default:
        break;
    }
  }

  getBgColorFollowId(id: number) {
    switch (id) {
      case 1:
        return AppStyle.BgMood.Rad;
      case 2:
        return AppStyle.BgMood.Good;
      case 3:
        return AppStyle.BgMood.Meh;
      case 4:
        return AppStyle.BgMood.Bad;
      case 5:
        return AppStyle.BgMood.Awful;
      default:
        break;
    }
  }

  getBgLightColorFollowType(
    type: string /**'awful' | 'bad' | 'good' | 'rad' | 'meh'*/,
  ) {
    switch (type) {
      case 'awful':
        return '#979d99';
      case 'bad':
        return '#b1bfeb';
      case 'rad':
        return '#f5ad6e';
      case 'good':
        return '#edd462';
      case 'meh':
        return '#93ccab';
      default:
        break;
    }
  }

  getIdFollowType(type: string) {
    switch (type) {
      case 'rad':
        return 0;
      case 'good':
        return 1;
      case 'meh':
        return 2;
      case 'bad':
        return 3;
      case 'awful':
        return 4;
      default:
        break;
    }
  }
  getIdFollowTypeRevert(type: string) {
    switch (type) {
      case 'rad':
        return 5;
      case 'good':
        return 4;
      case 'meh':
        return 3;
      case 'bad':
        return 2;
      case 'awful':
        return 1;
    }
  }

  getImageFollowType(
    type: string /**'awful' | 'bad' | 'good' | 'rad' | 'meh'*/,
  ) {
    switch (type) {
      case 'awful':
        return IC_BASE_AWFUL;
      case 'bad':
        return IC_BASE_BAD;
      case 'good':
        return IC_BASE_GOOD;
      case 'rad':
        return IC_BASE_RAD;
      case 'meh':
        return IC_BASE_MEH;
      default:
        break;
    }
  }
  getImageBGFollowType(
    type: string /**'awful' | 'bad' | 'good' | 'rad' | 'meh'*/,
  ) {
    switch (type) {
      case 'awful':
        return BG_DARK_DEAD;
      case 'bad':
        return BG_DARK_SAD;
      case 'rad':
        return BG_DARK_LAUGHING;
      case 'good':
        return BG_DARK_HAPPY;
      case 'meh':
        return BG_DARK_NEUTRAL;
      default:
        break;
    }
  }
  getColorFollowType(
    type: string /**'awful' | 'bad' | 'good' | 'rad' | 'meh'*/,
  ) {
    switch (type) {
      case 'awful':
        return AppStyle.BgMood.Awful;
      case 'bad':
        return AppStyle.BgMood.Bad;
      case 'rad':
        return AppStyle.BgMood.Rad;
      case 'good':
        return AppStyle.BgMood.Good;
      case 'meh':
        return AppStyle.BgMood.Meh;
      default:
        break;
    }
  }

  getIconFollowImg(img: string) {
    switch (img) {
      case 'ic_rise_shine':
        return IC_RISE_SHINE;
      case 'ic_see_doctor':
        return IC_SEE_DOCTOR;
      case 'ic_got_sick':
        return IC_GOT_SICK;
      case 'ic_family_time':
        return IC_FAMILY_TIME;
      case 'ic_have_date':
        return IC_HAVE_DATE;
      case 'ic_party_party':
        return IC_PARTY_PARTY;
      case 'ic_feel_lonely':
        return IC_FEEL_LONELY;
      case 'ic_heartbroken':
        return IC_HEARTBROKEN;
      case 'ic_date_gone_wrong':
        return IC_DATE_GONE_WRONG;
      case 'ic_no_party':
        return IC_NO_PARTY;
      case 'ic_accomplished':
        return IC_ACCOMPLISHED;
      case 'ic_tasks_done':
        return IC_TASKS_DONE;
      case 'ic_meet_deadline':
        return IC_MEET_DEADLINE;
      case 'ic_passed':
        return IC_PASSED;
      case 'ic_useless_day':
        return IC_USELESS_DAY;
      case 'ic_work_overtime':
        return IC_WORK_OVERTIME;
      case 'ic_not_passed':
        return IC_NOT_PASSED;
      case 'ic_busy_day':
        return IC_BUSY_DAY;
      case 'ic_missed_deadline':
        return IC_MISSED_DEADLINE;
      case 'ic_exercise':
        return IC_EXERCISE;
      case 'ic_win_game':
        return IC_WIN_GAME;
      case 'ic_shopping':
        return IC_SHOPPING;
      case 'ic_free_day':
        return IC_FREE_DAY;
      case 'ic_travelling':
        return IC_TRAVELING;
      case 'ic_wonderful_trip':
        return IC_WONDERFUL_TRIP;
      case 'ic_safe_trip':
        return IC_SAFE_TRIP;
      case 'ic_good_meal':
        return IC_GOOD_MEAL;
      case 'ic_good_reading':
        return IC_GOOD_READING;
      case 'ic_new_hobby':
        return IC_NEW_HOBBY;
      case 'ic_good_sleep':
        return IC_GOOD_SLEEP;
      case 'ic_go_as_planned':
        return IC_GO_AS_PLANNED;
      case 'ic_no_exercise':
        return IC_NO_EXERCISE;
      case 'ic_boring_trip':
        return IC_BORING_TRIP;
      case 'ic_boring_book':
        return IC_BORING_BOOK;
      case 'ic_plan_canceled':
        return IC_PLAN_CANCELED;
      case 'ic_loose_game':
        return IC_LOOSE_GAME;
      case 'ic_money_spent':
        return IC_MONEY_SPENT;
      case 'ic_get_lost ':
        return IC_GET_LOST;
      case 'ic_small_injury':
        return IC_SMALL_INJURY;
      case 'ic_bad_food':
        return IC_BAD_FOOD;
      case 'ic_nothing_to_do':
        return IC_NOTHING_TO_DO;
      case 'ic_lack_of_sleep':
        return IC_LACK_OF_SLEEP;
      case 'ic_got_into_accident':
        return IC_GOT_INTO_ACCIDENT;
      case 'ic_happy_anniversary':
        return IC_HAPPY_ANNIVERSARY;
      case 'ic_anniversary':
        return IC_ANNIVERSARY;
      default:
        break;
    }
  }
}
