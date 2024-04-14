import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useContext, useState} from 'react';
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
import {forgetPass, otpCheck, reg} from '../../services/AuthServices';
import {AppContext} from '../../Providers';
// import {ScrollView} from 'react-native-gesture-handler';

const OtpCheck = ({navigation, route}) => {
  const context = useContext(AppContext);
  const [code, setCode] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);

  const validate = async () => {
    console.log(route?.params?.email, code);
    if (code) {
      context.setLoading(true);
      Keyboard.dismiss();
      await otpCheck({email: route?.params?.email, otp: code})
        .then(res => {
          console.log(res?.data, 'succcess');
          if (res.status === 200) {
            navigation.navigate('ResetPassword', {
              email: route?.params?.email,
              code: code,
            });
            setCode('');
          }
        })
        .catch(error => {
          console.log(error?.response, 'invalid');
          if (error?.response?.data?.message === 'invalid') {
            Alert.alert(error?.response?.data?.message);
          }
        })
        .finally(() => context.setLoading(false));
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          height: Dimensions.get('screen').height - moderateScale(50),
          width: screenWidth,
        }}>
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
            Consultar su correo electrónico
          </Text>
          <CustomTextInput
            max={4}
            placeholder={'ingrese el código otp*'}
            keyboardType={'numeric'}
            value={code}
            handleTextChange={e => {
              if (e?.length === 4) {
                setSubmitDisable(false);
              } else {
                setSubmitDisable(true);
              }
              setCode(e);
            }}
            // LeftIcon="mail-outline"
            marginTop={moderateScale(20, 0.1)}
          />
          <CustomButton
            disable={submitDisable}
            onPress={validate}
            title={'Continuar'}
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
export default OtpCheck;
