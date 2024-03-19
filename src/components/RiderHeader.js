import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {BackSvg, HeaderSvg, LogoRed} from '../assets/images/svg';
import {colors} from '../constants';
import {moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styless from '../globalStyle';
import {useNavigation} from '@react-navigation/native';
import FontSizes from '../constants/fontSizes';
import Fonts from '../assets/fonts';

const RHeader = ({title, text, ID, onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <HeaderSvg width={419} height={133} />
      <View
        style={[
          {
            justifyContent: 'flex-start',
            left: moderateScale(20),
            top: moderateScale(40),
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            backgroundColor: colors.lightGrey,
            borderColor: colors.primaryA,
            borderWidth: 1,
            width: moderateScale(66),
            height: moderateScale(66),
            borderRadius: moderateScale(66 / 2),
          }}></View>

        <View style={{marginLeft: moderateScale(20)}}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text2}>{text}</Text>
          <Text style={styles.text2}>ID #{ID}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          right: moderateScale(20),
          top: moderateScale(50),
        }}>
        <MaterialCommunityIcons
          name={'logout'}
          size={moderateScale(26)}
          color={colors.primaryA}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - moderateScale(10),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontSize: FontSizes.medium,
  },
  text2: {color: colors.black, fontSize: FontSizes.small, fontStyle: 'italic'},
});
export default RHeader;
