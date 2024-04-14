import {
  View,
  Keyboard,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {passRegex, phoneRegex, reg, signup} from '../../services/AuthServices';
import {AppContext} from '../../Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {networkCheck} from '../../constants/axios';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

// import {ScrollView} from 'react-native-gesture-handler';

export const GOOGLE_API_KEY = 'AIzaSyABy0de4oAU34qkNVvF4xiiVmvS9zdeiMY';
const Register = ({navigation}) => {
  const context = useContext(AppContext);

  const [submitDisable, setSubmitDisable] = useState(true);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();

  const [nerror, setNerror] = useState('');
  const [lnerror, setLnerror] = useState('');
  const [Eerror, setEerror] = useState('');
  const [pherror, setpherror] = useState('');
  const [aerror, setAerror] = useState('');
  const [perror, setPerror] = useState('');
  const [cperror, setCperror] = useState('');

  useEffect(() => {
    Geocoder.init(GOOGLE_API_KEY);

    getaddress();
  }, []);

  const getaddress = () => {
    context.setLoading(true);
    Geolocation.getCurrentPosition(info => {
      console.log(info, 'coords');
      getPhysicalAddress({
        latitude: info?.coords?.latitude,
        longitude: info?.coords?.longitude,
      });
    });
  };

  const getPhysicalAddress = address => {
    // context.setLoading(true)
    setTimeout(() => {
      Geocoder.from(address)
        .then(json => {
          console.log(json);
          // console.log(
          //   'here',
          //   json,
          //   json?.results[0].address_components[1]?.long_name,
          // );
          // getExactAddress(json?.results[0].address_components);
          const address = json?.results[0].formatted_address;
          console.log('ad', address);
          setAddress(address);
        })
        .catch(error => {
          console.warn(error, 'error');
        })
        .finally(() => {
          context.setLoading(false);
        });
    }, 100);
  };

  const onSignUp = () => {
    context.setLoading(true);

    // if (!emailReg.test(email)) {
    //   Alert.alert('Invalid Email ');
    //   // context.setloading(false);
    // }
    Keyboard.dismiss();
    let body = {
      name,
      lastName,
      email,
      phoneNum,
      address,
      password,
      role: 'rider',
      repeatPassword,
      device_token: 'abc',
    };
    signup(body)
      .then(async res => {
        // context.setloading(false);
        console.log(res?.data, 'len');
        // navigation.navigate('SignIn');
        if (res.status === 200) {
          context.setToken(res?.data?.token);
          context.setUserData(res?.data?.user);
          await AsyncStorage.setItem('password', password);
          await AsyncStorage.setItem('token', res?.data?.token);
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(res?.data?.user),
          );
        }
      })
      .catch(err => {
        // context.setloading(false);
        networkCheck(err);

        if (err?.response?.status === 422) {
          Alert.alert(err?.response?.data?.message);
        }
        console.log(err?.response?.data, 'Error');
      })
      .finally(() => {
        context.setLoading(false);
      });
  };

  useEffect(() => {
    validate();
  }, [
    email,
    Eerror,
    password,
    perror,
    name,
    nerror,
    lastName,
    lnerror,
    phoneNum,
    pherror,
    repeatPassword,
    cperror,
    address,
    aerror,
  ]);

  useEffect(() => {
    if (repeatPassword && repeatPassword === password) {
      setCperror('');
    } else if (repeatPassword) {
      setCperror('Las contraseñas no coinciden');
    } else {
      setCperror('');
    }
  }, [repeatPassword, password]);

  const validate = () => {
    if (
      email &&
      !Eerror &&
      password &&
      !perror &&
      name &&
      !nerror &&
      lastName &&
      !lnerror &&
      phoneNum &&
      !pherror &&
      repeatPassword &&
      !cperror &&
      address &&
      !aerror
    ) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={{flex: 1, backgroundColor: colors.white, width: screenWidth}}>
      <Header logo={true} />

      <View
        style={{
          alignItems: 'center',
          marginTop: moderateScale(70, 0.1),
          width: screenWidth - 40,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Text
          style={{
            paddingTop: 5,
            fontFamily: Fonts.extraBold,
            color: colors.gray,
            fontSize: FontSizes.centerBig,
          }}>
          Registrate
        </Text>
        <CustomTextInput
          placeholder={'Nombre*'}
          value={name}
          handleTextChange={text => {
            if (text.length < 3) {
              setNerror('Name is too short');
            } else {
              setNerror('');
            }
            setName(text);
          }}
          marginTop={moderateScale(20, 0.1)}
          error={nerror}
        />

        <CustomTextInput
          placeholder={'Apellido*'}
          value={lastName}
          handleTextChange={text => {
            if (text.length < 3) {
              setLnerror('Name is too short');
            } else {
              setLnerror('');
            }
            setLastName(text);
          }}
          marginTop={moderateScale(20, 0.1)}
          error={lnerror}
        />

        <CustomTextInput
          placeholder={'Correo electronico**'}
          value={email}
          keyboardType={'email-address'}
          handleTextChange={e => {
            if (reg.test(e)) {
              setEerror('');
            } else {
              setEerror('Ex: myemail@host.xyz');
            }
            setEmail(e);
          }}
          marginTop={moderateScale(20, 0.1)}
          error={Eerror}
        />

        <CustomTextInput
          multiline={true}
          number={2}
          placeholder={'Teléfono*'}
          keyboardType={'numeric'}
          value={phoneNum}
          handleTextChange={e => {
            console.log(phoneRegex.test(e));
            if (phoneRegex.test(e)) {
              setpherror('');
            } else {
              setpherror('Invalid Phone number');
            }
            setPhoneNum(e);
          }}
          marginTop={moderateScale(20, 0.1)}
          error={pherror}
        />

        <CustomTextInput
          placeholder={'Dirección*'}
          value={address}
          handleTextChange={text => setAddress(text)}
          marginTop={moderateScale(20, 0.1)}
          error={aerror}
        />

        <CustomTextInput
          visible={true}
          placeholder={'Contraseña*'}
          value={password}
          handleTextChange={e => {
            if (e) {
              if (passRegex.test(e)) {
                setPerror('');
              } else {
                setPerror('La contraseña no es segura');
              }
            } else {
              setPerror('');
            }

            setPassword(e);
          }}
          rightIcon={true}
          marginTop={moderateScale(20, 0.1)}
          error={perror}
        />

        <CustomTextInput
          visible={true}
          placeholder={'Repetir contraseña*'}
          value={repeatPassword}
          handleTextChange={e => {
            setRepeatPassword(e);
          }}
          rightIcon={true}
          marginTop={moderateScale(20, 0.1)}
          error={cperror}
        />

        <CustomButton
          disable={submitDisable}
          onPress={() => {
            onSignUp();
          }}
          title={'Registrarse'}
          marginTop={moderateScale(25, 0.1)}
          marginBottom={moderateScale(10, 0.1)}
        />
        <Text
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          style={{
            paddingTop: 5,
            fontFamily: Fonts.extraBold,
            color: colors.primary,
            fontSize: FontSizes.regular,
            marginBottom: moderateScale(30, 0.1),
          }}>
          Iniciar sesión
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
export default Register;
