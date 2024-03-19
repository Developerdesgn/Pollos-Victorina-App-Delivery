import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../globalStyle';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';
import Fonts from '../assets/fonts';
import FontSizes from '../constants/fontSizes';

const IconCard = ({Icon, text1, text2, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.paymentCard, {alignItems: 'center'}]}>
      <Icon />
      <View
        style={[
          styles.column,
          {alignItems: 'center', marginVertical: moderateScale(5)},
        ]}>
        <Text style={[styles.normalText, styless.text1]}>{text1}</Text>
        <Text style={[styless.text2]}>{text2}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconCard;
const styless = StyleSheet.create({
  text2: {
    textAlign: 'center',
    fontSize: FontSizes.regular,
    color: colors.mediumGray,
    fontFamily: Fonts.medium,
    lineHeight: moderateScale(25),
  },
  text1: {
    color: colors.black,
    fontFamily: Fonts.extraBold,
    lineHeight: moderateScale(20),
  },
});
