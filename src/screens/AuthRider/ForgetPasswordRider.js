import React, {useContext, useState} from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Fonts from '../../assets/fonts';
import {Lock, RectangleDown} from '../../assets/images/svg';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Header from '../../components/Header';
import {colors} from '../../constants';
import FontSizes from '../../constants/fontSizes';
import {screenWidth} from '../../constants/screenResolution';

import {AppContext} from '../../Providers';
import {forgetPass, reg} from '../../services/AuthServices';

const ForgetPasswordRider = ({navigation}) => {
  const context = useContext(AppContext);

  const [email, setEmail] = useState();

  const [Eerror, setEerror] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);

  const validate = async () => {
    console.log(email, Eerror);
    if (email && !Eerror) {
      context.setLoading(true);
      Keyboard.dismiss();
      setSubmitDisable(true);
      await forgetPass({email: email})
        .then(async res => {
          console.log(res, 'succcess');
          if (res.status === 200) {
            Alert.alert('Please check your email');
            // navigation.navigate('OtpCheck', {email: email});
            setEmail('');
          }
        })
        .catch(error => {
          console.log(error?.response, 'errr');
          if (error?.response?.status === 401) {
            Alert.alert(error?.response?.data?.message);
          }
        })
        .finally(() => {
          context.setLoading(false);
          setSubmitDisable(false);
        });
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          height: Dimensions.get('screen').height - moderateScale(40),
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
            ¿Has olvidado tu contraseña?
          </Text>
          <CustomTextInput
            placeholder={'Correo electronico*'}
            keyboardType={'email-address'}
            value={email}
            handleTextChange={e => {
              if (reg.test(e)) {
                setEerror('');
                setSubmitDisable(false);
              } else {
                setEerror('Ex: myemail@host.xyz');
              }
              setEmail(e);
            }}
            LeftIcon="mail-outline"
            marginTop={moderateScale(20, 0.1)}
            error={Eerror}
          />
          <CustomButton
            disable={submitDisable}
            onPress={validate}
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
export default ForgetPasswordRider;
