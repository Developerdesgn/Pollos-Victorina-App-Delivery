import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors} from '../../constants';
import {
  Facebook,
  Google,
  HeaderSvg,
  HorLine,
  Lock,
  LogoRed,
  TimerWhite,
} from '../../assets/images/svg';
import CustomTextInput from '../../components/CustomTextInput';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import FontSizes from '../../constants/fontSizes';
import Fonts from '../../assets/fonts';
import SocialButtons from '../../components/SocialButtons';
import {screenWidth} from '../../constants/screenResolution';
import {AppContext} from '../../Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {ScrollView} from 'react-native-gesture-handler';

const SignInRider = ({navigation}) => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const setData = async data => {
  //   await AsyncStorage.setItem('userData', JSON.stringify(data));
  // };
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors.white, width: screenWidth}}>
      <Header logo={true} back={true} />
      <View
        style={{
          alignItems: 'center',
          marginTop: moderateScale(100, 0.1),
          marginBottom: moderateScale(50, 0.1),
          // borderWidth: 1,
          width: screenWidth - 40,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Text
          style={{
            fontSize: FontSizes.centerBig,
            color: colors.primary,
            fontFamily: Fonts.extraBold,
            letterSpacing: 2,
          }}>
          INICIO
        </Text>
        <CustomTextInput
          placeholder={'Usuario*'}
          keyboardType={'email-address'}
          value={email}
          handleTextChange={text => setEmail(text)}
          LeftIcon="person-circle-outline"
          marginTop={moderateScale(20, 0.1)}
        />
        <CustomTextInput
          visible={false}
          placeholder={'Contraseña*'}
          value={password}
          handleTextChange={e => setPassword(e)}
          rightIcon={true}
          marginTop={moderateScale(20, 0.1)}
        />
        <CustomButton
          onPress={() => {
            context.setToken('sania');
            AsyncStorage.setItem('token', 'sania');
            // navigation.navigate('Delivery');
          }}
          // RightIcon={true}
          // RIcon={TimerWhite}
          title={'Ingresar'}
          // rightText={'Iniciar Turno'}
          marginTop={moderateScale(25, 0.1)}
        />
        <Text
          onPress={() => {
            navigation.navigate('ForgetPasswordRider');
          }}
          style={{
            fontFamily: Fonts.regular,
            color: colors.gray,
            fontSize: FontSizes.regular,
          }}>
          ¿Has olvidado tu contraseña?
        </Text>
      </View>
    </ScrollView>
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
export default SignInRider;
