import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {AppContext} from '../../Providers';
import Fonts from '../../assets/fonts';
import {Google} from '../../assets/images/svg';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Header from '../../components/Header';
import SocialButtons from '../../components/SocialButtons';
import {colors} from '../../constants';
import FontSizes from '../../constants/fontSizes';
import {screenWidth} from '../../constants/screenResolution';
import {login, passRegex, resetPass} from '../../services/AuthServices';
import {checkToken} from '../../services/notificationService';
// import {ScrollView} from 'react-native-gesture-handler';
import {reg} from '../../services/AuthServices';
import {networkCheck} from '../../constants/axios';

const ResetPassword = ({navigation, route}) => {
  const context = useContext(AppContext);
  // console.log(context)
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [cerror, setCError] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);

  useEffect(() => {
    if (password && confirmPass && !error && !cerror) {
      setSubmitDisable(false);
    }
  }, [password, confirmPass, error, cerror]);
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('ForgetPass');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const validate = async () => {
    console.log(confirmPass, error, password, submitDisable);

    context.setLoading(true);
    Keyboard.dismiss();
    let body = {
      email: route?.params?.email,
      otp: route?.params?.code,
      password: password,
    };
    console.log(body);
    await resetPass(body)
      .then(async res => {
        console.log(res);
        if (res.status === 200) {
          Alert.alert(res?.data?.message);
          navigation.navigate('SignInRider');
          setPassword('');
          setConfirmPassword('');
        }
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
        // Alert.alert(error?.response?.data?.message);
      })
      .finally(() => context.setLoading(false));
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={{flex: 1, backgroundColor: colors.white, width: screenWidth}}>
      <Header
        logo={true}
        back={false}
        onPress={() => {
          navigation.navigate('ForgetPasswordRider');
        }}
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: moderateScale(100, 0.1),
          marginBottom: moderateScale(50, 0.1),
          // borderWidth: 1,
          width: screenWidth - moderateScale(40),
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
          Restablecer la contraseña
        </Text>
        {/* <CustomTextInput
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
        /> */}
        <CustomTextInput
          visible={false}
          placeholder={'Contraseña*'}
          value={password}
          handleTextChange={e => {
            if (passRegex.test(e)) {
              setError('');
            } else {
              setError('La contraseña no es segura');
            }
            setPassword(e);
          }}
          rightIcon={true}
          marginTop={moderateScale(20, 0.1)}
          error={error}
        />
        <CustomTextInput
          visible={false}
          placeholder={'Confirmar Contraseña'}
          value={confirmPass}
          handleTextChange={e => {
            if (e !== password) {
              setCError('Las contraseñas no coinciden');
            } else {
              setCError('');
            }
            setConfirmPassword(e);
          }}
          rightIcon={true}
          marginTop={moderateScale(20, 0.1)}
          error={cerror}
        />
        <CustomButton
          disable={submitDisable}
          onPress={validate}
          title={'Entregar'}
          marginTop={moderateScale(25, 0.1)}
        />
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
export default ResetPassword;
