import {makeAutoObservable} from 'mobx';
import * as CommonFn from '../../../shared/ui/containers/calender/commonFn';

export default class CalendarStore {
  curDay = CommonFn.ymd();
  curDate = CommonFn.ymd();
  curMonth = parseInt(CommonFn.ym().split('-')[1], 10);
  curYear = CommonFn.y(new Date());
  curYearMonth = CommonFn.ym();
  changeCalendar = true;
  arrDayInWeeksVN = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];
  arrDayInWeeksEN = [
    'Sunday',
    'Monday',
    'TuesDay',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  constructor() {
    makeAutoObservable(this);
  }
  changeMonth(setMonth: any) {
    this.curMonth = setMonth;
    if (this.curMonth < 1) {
      this.curMonth = 12;
    } else if (this.curMonth > 12) {
      this.curMonth = 1;
    }
  }

  limitMonth() {
    if (this.curYearMonth == CommonFn.ym()) {
      return true;
    } else {
      return false;
    }
  }

  changeScreen() {
    this.changeCalendar = !this.changeCalendar;
  }
  changeDate(setDate: string) {
    this.curDate = setDate;
  }
  changeDay(setDay: string) {
    this.curDay = setDay;
  }
  changeYearMonth(value: string) {
    this.curYearMonth = value;
  }

  getDayInMonth(day: string) {
    let idx = new Date(day);
    let index = idx.getDay();
    return this.arrDayInWeeksEN[index];
  }
}
