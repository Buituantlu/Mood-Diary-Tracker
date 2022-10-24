import moment from 'moment';

const calendarArray = date => {
  const dates: Array<any> = [];
  for (let i = 0; i < 35; i += 1) {
    const startDate = moment(date).date(1);
    dates[i] = startDate.weekday(i + 1).format('YYYY-MM-DD');
  }
  return dates;
};

const ym = (date?: any | undefined) => {
  return moment(date || undefined).format('YYYY-MM');
};
const ymd = (date?: any | undefined) => {
  return moment(date || undefined).format('YYYY-MM-DD');
};
const d = (date?: any | undefined) => {
  return moment(date || undefined).format('DD');
};

const day = (ymd?: any | undefined) => {
  return moment(ymd).day();
};

const hh = (day?: any | undefined) => {
  return moment(day).format('HH');
};

const mm = (day?: any | undefined) => {
  return moment(day).format('mm');
};

const y = (day?: any | undefined) => {
  return moment(day).format('YYYY');
};
export {calendarArray, ym, ymd, d, day, hh, mm, y};
