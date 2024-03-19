import React, {useState} from 'react';
import {TextInput, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import Ionicons from 'react-native-vector-icons/Ionicons'; // You can change the icon library if needed
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {colors} from '../constants';
import Fonts from '../assets/fonts';
import styles from '../globalStyle';
import {screenWidth} from '../constants/screenResolution';

const CustomTextInput = ({
  LeftIcon,
  rightIcon,
  marginTop,
  placeholder,
  value,
  handleTextChange,
  keyboardType,
  visible,
  SvgIcon,
  width,
  error,
  multiline,
  height,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(visible);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'gray',
          width: width || screenWidth * 0.8,
          // height: moderateScale(57, 0.1),
          paddingVertical: height === 80 ? moderateScale(2) : moderateScale(7),
          marginTop: marginTop,
          borderRadius: 41,
          overflow: 'hidden',
          backgroundColor: colors.secondary,
          paddingLeft: moderateScale(10, 0.1),
          borderColor: error ? colors.primary : colors.secondary,
          borderWidth: 1,
        }}>
        {LeftIcon && (
          <View style={{padding: 10}}>
            {SvgIcon ? (
              <LeftIcon />
            ) : (
              <Ionicons name={LeftIcon} size={20} color={colors.icon} />
            )}
          </View>
        )}
        <TextInput
          secureTextEntry={secureTextEntry}
          style={{
            flex: 1,
            height: height ? moderateScale(height) : moderateScale(40),
            paddingLeft: LeftIcon ? 0 : 10,
            fontFamily: Fonts.medium,
            color: colors.textBlack,
            lineHeight: moderateScale(18),
          }}
          multiline={multiline}
          placeholder={placeholder}
          value={value}
          onChangeText={handleTextChange}
          keyboardType={keyboardType}
          placeholderTextColor={colors.placeholder}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={toggleSecureTextEntry}
            style={{padding: 10, paddingRight: moderateScale(20, 0.1)}}>
            <Ionicons
              name={secureTextEntry ? 'eye' : 'eye-off'}
              size={20}
              color={colors.eye}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={[
            styles.smallText,
            {fontFamily: Fonts.regular, width: width || screenWidth * 0.8},
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomTextInput;
