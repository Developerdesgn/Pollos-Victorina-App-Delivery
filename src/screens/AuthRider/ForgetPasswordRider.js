import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constants';
import {
  Facebook,
  Google,
  HeaderSvg,
  HorLine,
  Lock,
  LogoRed,
  RectangleDown,
} from '../../assets/images/svg';
import CustomTextInput from '../../components/CustomTextInput';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import FontSizes from '../../constants/fontSizes';
import Fonts from '../../assets/fonts';
import SocialButtons from '../../components/SocialButtons';
import {screenWidth} from '../../constants/screenResolution';
// import {ScrollView} from 'react-native-gesture-handler';

const ForgetPasswordRider = ({navigation}) => {
  const [email, setEmail] = useState();

  return (
    <View style={{flex: 1, backgroundColor: colors.white, width: screenWidth}}>
      <Header logo={true} />
      <View
        style={{
          alignItems: 'center',
          marginTop: moderateScale(100, 0.1),
          width: screenWidth - 40,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Text
          style={{
            paddingTop: 10,
            fontFamily: Fonts.regular,
            color: colors.gray,
            fontSize: FontSizes.large1,
          }}>
          ¿Has olvidado tu contraseña?
        </Text>
        <CustomTextInput
          placeholder={'Correo electronico*'}
          keyboardType={'email-address'}
          value={email}
          handleTextChange={text => setEmail(text)}
          LeftIcon="mail-outline"
          marginTop={moderateScale(20, 0.1)}
        />
        <CustomButton
          onPress={() => {
            navigation.navigate('SignInRider');
          }}
          LeftIcon={true}
          Icon={Lock}
          title={'Restablecer contraseña'}
          marginTop={moderateScale(25, 0.1)}
        />
      </View>
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          alignSelf: 'flex-end',
          right: moderateScale(-20, 0.1),
        }}>
        <RectangleDown width={316} height={157} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continIcon: {
    backgroundColor: colors.primary,
    height: 2,
    width: '28%',
  },
});
export default ForgetPasswordRider;
