import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';
import styles from '../globalStyle';
import Fonts from '../assets/fonts';

const SubTotal = ({
  type,
  children,
  productCount,
  subtotal,
  delivery,
  discount,
}) => {
  if (type === 'type2') {
    return (
      <View style={styless.container}>
        <View style={styless.row}>
          <Text style={[styles.normalText, {lineHeight: moderateScale(16)}]}>
            Sub Total
          </Text>
          <Text style={[styles.normalText, {alignSelf: 'flex-start'}]}>
            ${subtotal}
          </Text>
        </View>

        <View style={styless.row}>
          <Text style={[styles.normalText, {lineHeight: moderateScale(20)}]}>
            Cargo por entrega
          </Text>
          <Text style={[styles.normalText, {alignSelf: 'flex-start'}]}>
            ${delivery}
          </Text>
        </View>

        <View style={styless.row}>
          <Text style={[styles.normalText, {lineHeight: moderateScale(24)}]}>
            Descuento
          </Text>
          <Text style={[styles.normalText, {alignSelf: 'flex-start'}]}>
            ${discount()}
            {/* ${discount} */}
          </Text>
        </View>
        <View style={[styless.row, {marginTop: moderateScale(10)}]}>
          <Text style={[styles.boldText, styless.text]}>Total</Text>
          <Text style={[styles.boldText, styless.text]}>
            ${subtotal + discount() + delivery}
          </Text>
        </View>
        {children}
      </View>
    );
  }
  return (
    <View style={styless.container}>
      <View style={styless.row}>
        <Text
          style={[
            styles.normalText,
            {width: moderateScale(100), lineHeight: moderateScale(24)},
          ]}>
          Productos elegidos
        </Text>
        <Text style={[styles.normalText, {alignSelf: 'flex-start'}]}>
          {productCount}
        </Text>
      </View>
      <View style={[styless.row]}>
        <Text style={[styles.boldText, styless.text]}>Sub-Total</Text>
        <Text style={[styles.boldText, styless.text]}>${subtotal}</Text>
      </View>
    </View>
  );
};

export default SubTotal;

const styless = StyleSheet.create({
  container: {
    marginVertical: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.lightgrey,
    width: '100%',
    padding: moderateScale(20),
  },
  row: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    marginBottom: moderateScale(5),
  },
  text: {
    color: colors.black,
    fontFamily: Fonts.extraBold,
  },
});
