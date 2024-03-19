import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
const DateInput = ({
  placeholderText,
  onChangeText,
  iconType,
  max,
  error,
  align,
  label,
  required,
  maxDate,
  minDate,
  value,
  padR,
  padL,
  ...rest
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {width} = Dimensions.get('window');
  const buttonWidth = width - 20;

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      // Handle selected date
    }
  };
  return (
    <View>
      <DatePicker
        // label='Label'
        // caption='Caption'
        style={[
          {
            // position: 'absolute',
            flex: 1,
            fontSize: 16,
            zIndex: 1000,
            color: 'red',
            // justifyContent: 'center',
            // alignItems: 'center',
            fontFamily: 'NotoSans-Regular',
            borderColor: 'white',
            backgroundColor: 'red',
          },
        ]}
        placement={'top'}
        zIndex={10000}
        theme={'dark'}
        placeholder="Pick Date"
        date={value}
        mode="time"
        onSelect={handleDateChange}
        //   accessoryRight={CalendarIcon}
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({});
