import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../globalStyle';

const Button = ({text, btnStyle, onPress, textStyle, RightIcon}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles.row, styles.alignCenter, btnStyle]}>
      <Text style={[styles.heading3, textStyle]}>{text}</Text>
      {RightIcon ? <RightIcon /> : null}
    </TouchableOpacity>
  );
};

export default Button;
