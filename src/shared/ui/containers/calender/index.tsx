import React, {useState} from 'react';
import CalendarSelect from './calendar_select';
import moment from 'moment';
import {observer} from 'mobx-react';
import CalendarStore from '../../../../modules/calendar/store/calendar_store';
import MoodStore from '../../../store/moodStore';
import UIStore from '../../../store/ui';

interface CalendarProps {
  fotmat: any;
  deat?: number | string;
  renderChildDay: (day: any) => void;
  changeDate: (day: any) => void;
  calendarChangeDate: (day: any) => void;
  calendarStore: CalendarStore;
  moodStore: MoodStore;
  uiStore: UIStore;
}

const Calendar = observer(
  ({
    fotmat,
    deat,
    renderChildDay,
    changeDate,
    calendarChangeDate,
    calendarStore,
    moodStore,
    uiStore,
  }: CalendarProps) => {
    const [format, setFormat] = useState(fotmat || 'x');
    const [date, setDate] = useState(moment(deat || undefined));

    const calendarChange = (type: number, unit: any) => {
      calendarStore.changeYearMonth(
        moment(calendarStore.curYearMonth).add(type, unit).format('YYYY-MM'),
      );
    };
    const selectDate = val => {
      const yearMonthDayArr = val.split('-');
      calendarChangeDate(val);
      changeDate(val);
      setDate(
        moment(date).set({
          year: parseInt(yearMonthDayArr[0], 10),
          month: parseInt(yearMonthDayArr[1], 10) - 1,
          date: parseInt(yearMonthDayArr[2], 10),
        }),
      );
    };

    return (
      <CalendarSelect
        uiStore={uiStore}
        moodStore={moodStore}
        calendarStore={calendarStore}
        calendarMonth={calendarStore.curYearMonth}
        date={date.format('YYYY-MM-DD')}
        selectDate={item => selectDate(item)}
        calendarChange={(type, unit) => calendarChange(type, unit)}
        renderChildDay={day => renderChildDay(day)}
      />
    );
  },
);

export default Calendar;
