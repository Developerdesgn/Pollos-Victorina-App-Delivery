import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';
import styless from '../globalStyle';

const Tabs = ({selectedButton, setSelectedButton, Icon1, Icon2}) => {
  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
  };

  const isButtonSelected = buttonName => {
    return selectedButton === buttonName;
  };

  const Tab = ({text, desc}) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: colors.white},
          styless.shadow,
          isButtonSelected(text) && styles.isSelected,
        ]}
        onPress={() => handleButtonPress(text)}>
        <Text
          style={[
            styles.bigText,
            {color: isButtonSelected(text) ? colors.primaryA : colors.black},
          ]}>
          {text}
        </Text>
        <Text
          style={[
            styless.menuText,
            styles.smallText,
            {marginTop: moderateScale(5)},
          ]}>
          {desc}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Tab text={'02'} desc={'PEDIDOS EN CURSO'} />
      <Tab text={'01'} desc={'HISTORIAL DE PEDIDOS'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
    width: '100%',
  },
  button: {
    width: moderateScale(156),
    height: moderateScale(115),
    backgroundColor: colors.lightgrey,
    borderRadius: moderateScale(25),
    marginHorizontal: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    paddingHorizontal: moderateScale(15),
  },

  bigText: {
    fontWeight: '900',
    fontSize: moderateScale(40),
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
  smallText: {
    lineHeight: moderateScale(11),
    fontSize: moderateScale(11),
    color: colors.black,
  },
});

export default Tabs;
