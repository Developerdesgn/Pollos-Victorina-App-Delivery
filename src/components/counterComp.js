import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';
import FontSizes from '../constants/fontSizes';
import Fonts from '../assets/fonts';

const CounterComponent = ({
  horizontal,
  vertical,
  marginLeft,
  count,
  setCount,
  onAdd,
  onDecrement,
}) => {
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <View
      style={[
        styles.container,
        {
          marginLeft: marginLeft,
          width: !vertical ? moderateScale(120) : null,
          height: vertical ? moderateScale(120) : null,
          flexDirection: vertical ? 'column' : 'row',
        },
      ]}>
      <TouchableOpacity
        disabled={count === 1}
        style={styles.button}
        onPress={onDecrement ? onDecrement : decrement}>
        <Text
          style={[
            styles.buttonText,
            {color: count === 1 ? colors.gray : colors.black},
          ]}>
          -
        </Text>
      </TouchableOpacity>

      <View
        style={[
          styles.button,
          styles.center,
          {
            width: vertical ? moderateScale(31) : moderateScale(48),
            height: vertical ? moderateScale(48) : moderateScale(31),
          },
        ]}>
        <Text style={styles.displayText}>{count}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onAdd ? onAdd : increment}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: moderateScale(31),
    height: moderateScale(31),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    // padding: m,
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  center: {
    width: moderateScale(48),
    height: moderateScale(31),
  },
  buttonText: {
    color: colors.black,
    fontSize: FontSizes.extraLarge,
    fontFamily: Fonts.extraBold,
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  displayText: {
    color: colors.primaryA,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.extraBold,
  },
});

export default CounterComponent;
