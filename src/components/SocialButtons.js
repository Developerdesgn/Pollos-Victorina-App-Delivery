import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Facebook} from '../assets/images/svg';
import styles from '../globalStyle';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Fonts from '../assets/fonts';
import FontSizes from '../constants/fontSizes';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';

const SocialButtons = ({title, Icon}) => {
  return (
    <TouchableOpacity
      style={[styles.alignCenter, styles.row, sheetStyle.buttonV]}>
      <Icon width={38} height={39} />
      <Text
        style={{
          fontSize: FontSizes.regular,
          fontFamily: Fonts.regular,
          color: colors.black,
          paddingLeft: moderateScale(8, 0.1),
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const sheetStyle = StyleSheet.create({
  buttonV: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 91,
    width: moderateScale(160, 0.1),
    height: moderateScale(57, 0.1),
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(8, 0.1),
  },
});
export default SocialButtons;
