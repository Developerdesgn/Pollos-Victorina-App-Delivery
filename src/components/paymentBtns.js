import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon library
import Paypal from '../assets/images/svg/pngwing.svg';
import RedPayment from '../assets/images/svg/RedPayment.svg';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';
import styless from '../globalStyle';
const PaymentButtons = ({Icon1, Icon2}) => {
  const [selectedButton, setSelectedButton] = useState('cash');

  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
  };

  const isButtonSelected = buttonName => {
    return selectedButton === buttonName;
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[styles.button, isButtonSelected('cash') && styles.isSelected]}
          onPress={() => handleButtonPress('cash')}>
          {Icon1 ? (
            <Icon1 />
          ) : (
            <RedPayment width={moderateScale(80)} height={moderateScale(50)} />
          )}

          {isButtonSelected('cash') && (
            <View style={styles.selected}>
              <Icon
                name="check"
                size={moderateScale(14)}
                color={colors.white}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={[
            styless.text,
            {textAlign: 'center', marginTop: moderateScale(5)},
          ]}>
          Tarjeta
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            isButtonSelected('paypal') && styles.isSelected,
          ]}
          onPress={() => handleButtonPress('paypal')}>
          {Icon2 ? (
            <Icon2 />
          ) : (
            <Paypal width={moderateScale(50)} height={moderateScale(36)} />
          )}

          {isButtonSelected('paypal') && (
            <View style={styles.selected}>
              <Icon
                name="check"
                size={moderateScale(14)}
                color={colors.white}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={[
            styless.text,
            {textAlign: 'center', marginTop: moderateScale(5)},
          ]}>
          Paypal
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  button: {
    width: moderateScale(85),
    height: moderateScale(72),
    backgroundColor: colors.lightgrey,
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  isSelected: {
    borderColor: colors.primaryA,
    borderWidth: 2,
    backgroundColor: colors.white,
  },
  selected: {
    top: -moderateScale(10),
    right: -0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(22 / 2),
    backgroundColor: colors.primaryA,
  },
});

export default PaymentButtons;
