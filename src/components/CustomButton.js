import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome'; // Import the icon library you prefer
import {colors, fonts} from '../constants';
import {moderateScale} from 'react-native-size-matters';
import Fonts from '../assets/fonts';
import FontSizes from '../constants/fontSizes';

const CustomButton = ({
  onPress,
  title,
  width,
  height,
  leftIcon,
  rightIcon,
  marginTop,
  btnStyle,
  textStyle,
  iconColor,
  marginBottom,
  Icon,
  RIcon,
  backgroundColor,
  rightText,
  disable,
  // Icon,
}) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || colors.primary,
    width: width || moderateScale(308, 0.1),
    height: height || moderateScale(57, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 39,
    marginTop: marginTop || moderateScale(40, 0.1),
    marginBottom: marginBottom || moderateScale(40, 0.1),
    flexDirection: leftIcon ? 'row' : 'column',
  };

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        styles.row,
        styles.button,
        buttonStyle,
        btnStyle,
        {flexDirection: 'row'},
      ]}>
      {Icon ? (
        <Icon />
      ) : (
        leftIcon && (
          <View style={styles.leftIcon}>
            <Icon1
              name={leftIcon}
              size={20}
              color={iconColor ? iconColor : colors.white}
            />
          </View>
        )
      )}

      <Text
        style={[
          styles.buttonText,
          textStyle,
          {marginLeft: Icon ? moderateScale(10) : null},
        ]}>
        {title}
        {rightText && (
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: colors.white,
              fontSize: FontSizes.extraSmall,
            }}>
            {'\n'}
            {rightText}
          </Text>
        )}
      </Text>

      {RIcon ? (
        <View style={styles.rightIcon}>
          <RIcon />
        </View>
      ) : (
        rightIcon && (
          <View style={styles.rightIcon}>
            <Icon1
              name={rightIcon}
              size={20}
              color={iconColor ? iconColor : colors.white}
            />
          </View>
        )
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // Common button styles can be placed here
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 5,
    // position: 'absolute',
  },

  buttonText: {
    fontFamily: Fonts.extraBold,
    color: colors.white,
  },
});

export default CustomButton;
