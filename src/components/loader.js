import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {ActivityIndicator} from 'react-native';

import {colors} from '../constants';
import {screenHeight, screenWidth} from '../constants/screenResolution';

const Loader = ({backgroundColor}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : 'rgba(0,0,0,0.5)',
        },
      ]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: screenHeight,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: moderateScale(120, 0.1),
    height: moderateScale(128, 0.1),
  },
});
export default Loader;
