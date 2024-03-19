import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {BackSvg} from '../assets/images/svg';
import {moderateScale} from 'react-native-size-matters';
import Fonts from '../assets/fonts';
import {colors} from '../constants';
import FontSizes from '../constants/fontSizes';

const HeaderIcon = ({
  text,
  marginTop,
  fontFamily = Fonts.extraBold,
  color = colors.primary,
  fontSize = FontSizes.large1,
  marginTopIcon = moderateScale(10, 0.1),
  navigation,
  onPress,
}) => {
  return (
    <View style={{alignItems: 'center', marginTop: marginTop}}>
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            position: 'absolute',
            alignSelf: 'flex-start',
            padding: moderateScale(10, 0.1),
            marginLeft: moderateScale(10, 0.1),
            marginTop: marginTopIcon,
          }}>
          <BackSvg width={27} height={27} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'absolute',
            alignSelf: 'flex-start',
            padding: moderateScale(10, 0.1),
            marginLeft: moderateScale(10, 0.1),
            marginTop: marginTopIcon,
          }}>
          <BackSvg width={27} height={27} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontFamily,
          color,
          fontSize,
          marginTop: moderateScale(15, 0.1),
        }}>
        {text}
      </Text>
    </View>
  );
};

export default HeaderIcon;
