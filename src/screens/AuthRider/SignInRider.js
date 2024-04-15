import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {AppContext} from '../../Providers';
import Fonts from '../../assets/fonts';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Header from '../../components/Header';
import {colors} from '../../constants';
import FontSizes from '../../constants/fontSizes';
import {screenWidth} from '../../constants/screenResolution';

import {Alert, Keyboard} from 'react-native';
import {login} from '../../services/AuthServices';
import {checkToken} from '../../services/notificationService';
// import {ScrollView} from 'react-native-gesture-handler';
import {reg} from '../../services/AuthServices';

const SignInRider = ({navigation}) => {
  const context = useContext(AppContext);
  // console.log(context)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [fcm, setFcm] = useState('');

  useEffect(() => {
    checkToken(setFcm);
  }, []);

  useEffect(() => {
    if (email && password && !error) {
      setSubmitDisable(false);
    }
  }, [email, password]);

  const validate = async () => {
    // context.setToken('rider');
    // await AsyncStorage.setItem('token', 'rider');
    // await AsyncStorage.setItem('userData', JSON.stringify({}));
    // return;
    console.log(email, error, password, submitDisable);
    if (email && !error && password) {
      context.setLoading(true);
      Keyboard.dismiss();
      await login({email: email, password: password})
        .then(async res => {
          console.log(res?.data);
          if (res.status === 200) {
            context.setToken(res?.data?.token);
            context.setUserData(res?.data?.user);

            await AsyncStorage.setItem('token', res?.data?.token);
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify(res?.data?.user),
            );

            await AsyncStorage.setItem(
              'userData',
              JSON.stringify(res?.data?.user),
            );
          }
        })
        .catch(error => {
          console.log(error, 'errr');
          if (error.response.status === 401) {
            Alert.alert(error.response.data.message);
          }
        })
        .finally(() => context.setLoading(false));
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
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
          placeholder={'Correo electronico*'}
          keyboardType={'email-address'}
          value={email}
          handleTextChange={e => {
            if (reg.test(e)) {
              setError('');
            } else {
              setError('Ex: myemail@host.xyz');
            }
            setEmail(e);
          }}
          leftIcon="mail-outline"
          marginTop={moderateScale(20, 0.1)}
          error={error}
        />
        <CustomTextInput
          visible={true}
          placeholder={'Contraseña*'}
          value={password}
          handleTextChange={e => {
            setPassword(e);
          }}
          rightIcon={true}
          marginTop={moderateScale(20, 0.1)}
        />

        <Text
          onPress={() => {
            navigation.navigate('ForgetPasswordRider');
          }}
          style={{
            fontFamily: Fonts.regular,
            color: colors.primary,
            fontSize: FontSizes.regular,
            marginTop: moderateScale(10),
            marginRight: moderateScale(20),
            alignSelf: 'flex-end',
          }}>
          ¿Has olvidado tu contraseña?
        </Text>
        <CustomButton
          disable={submitDisable}
          onPress={validate}
          title={'Ingresar'}
          marginTop={moderateScale(25, 0.1)}
        />

        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={{
            paddingHorizontal: moderateScale(10),
            fontFamily: Fonts.regular,
            color: colors.grey,
            fontSize: FontSizes.regular,
            marginTop: moderateScale(30, 0.1),
          }}>
          Crear cuenta nueva
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
