import {observer} from 'mobx-react';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseText from '../../../modules/calendar/component/text';
import CalendarStore from '../../../modules/calendar/store/calendar_store';
import {IC_LEFT_ARROW_SMALL, IC_RIGHT_ARROW_SMALL} from '../../../utils/icons';
import UIStore from '../../store/ui';

interface HeaderCalendarProps {
  title: string;
  backMonth: () => void;
  nextMonth: () => void;
  calendarStore: CalendarStore;
  uiStore: UIStore;
}

const HeaderCalendar = observer(
  ({
    title,
    backMonth,
    nextMonth,
    calendarStore,
    uiStore,
  }: HeaderCalendarProps) => {
    return (
      <View style={styles.centerHeader}>
        <TouchableOpacity onPress={backMonth}>
          <Image
            style={[
              styles.icRight,
              {tintColor: uiStore.bgMode == 'light' ? '#666666' : '#AAAAAA'},
            ]}
            source={IC_LEFT_ARROW_SMALL}
          />
        </TouchableOpacity>
        <BaseText uiStore={uiStore} style={[styles.txtHeader]} text={title} />
        <TouchableOpacity
          onPress={() => (calendarStore?.limitMonth() ? null : nextMonth())}>
          <Image
            style={[
              styles.icRight,
              {
                tintColor:
                  (calendarStore?.limitMonth() && uiStore.bgMode == 'dark') ||
                  (uiStore.bgMode == 'light' && !calendarStore?.limitMonth())
                    ? '#666666'
                    : '#AAAAAA',
              },
            ]}
            source={IC_RIGHT_ARROW_SMALL}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

export default HeaderCalendar;

const styles = StyleSheet.create({
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtHeader: {
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '500',
  },
  icRight: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
});
