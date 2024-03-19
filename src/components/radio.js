import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';
import FontSizes from '../constants/fontSizes';
import Fonts from '../assets/fonts';

const RadioButton = ({onPress, selected, children, image}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={onPress}>
        <View>{image ? image(selected) : null}</View>
        <Text
          style={[
            styles.radioButtonText,
            {
              color: image && selected ? colors.primaryA : colors.black,
              fontFamily: image && selected ? Fonts.extraBold : null,
            },
          ]}>
          {children}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  radioButton: {
    height: moderateScale(25, 0.1),
    width: moderateScale(25, 0.1),
    backgroundColor: colors.white,
    borderRadius: moderateScale(25 / 2),
    borderWidth: moderateScale(2),
    borderColor: colors.primaryA,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: moderateScale(14, 0.1),
    width: moderateScale(14, 0.1),
    borderRadius: moderateScale(14 / 2, 0.1),
    backgroundColor: colors.primaryA,
  },
  radioButtonText: {
    marginVertical: moderateScale(5),
    // marginTop: moderateScale(3, 0.1),
    // alignItems:"center",
    paddingHorizontal: moderateScale(10),
    color: colors.black,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.medium,
  },
});
