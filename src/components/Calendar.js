import React, {useState, useMemo} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CustomCalendar = props => {
  const initDate = '2022-12-01';
  const [selected, setSelected] = useState(initDate);
  const marked = useMemo(
    () => ({
      [selected]: {
        customStyles: {
          container: {
            backgroundColor: 'green',
            borderRadius: 0,
          },
          text: {
            color: 'white',
          },
        },
      },
    }),
    [selected],
  );
  return (
    <Calendar
      initialDate="2022-12-01"
      markingType="custom"
      markedDates={marked}
      onDayPress={day => {
        setSelected(day.dateString);
        props.onDaySelect && props.onDaySelect(day);
      }}
      {...props}
    />
  );
};

export default CustomCalendar;
