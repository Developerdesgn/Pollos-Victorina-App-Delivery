import axios from 'axios';
import {API} from '../constants';

export const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);

export let passRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/);
export let phoneRegex = new RegExp(/^34(?:6[0-9]|7[1-9])[0-9]{7}$/);

export const login = ({email, password, device_token}) => {
  // console.log(device_token, 'token11');
  return axios.post(API.login, {
    email,
    password,
    device_token,
  });
};

export const signup = ({
  name,
  lastName,
  email,
  phoneNum,
  address,
  password,
  repeatPassword,
  device_token,
  role,
}) =>
  axios.post(API.signup, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
    },
    name,
    last_name: lastName,
    email,
    ballot: 'testing',
    role,
    telephone: phoneNum,
    device_token,
    address,
    password,
    password_confirmation: repeatPassword,
  });

export const forgetPass = ({email}) =>
  axios.post(
    API.forgetPassword,
    {email: email},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': `application/json`,
      },
    },
  );

export const otpCheck = ({email, otp}) =>
  axios.post(
    API.otpcheck,
    {email: email, otp: otp},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': `application/json`,
      },
    },
  );

export const resetPass = ({email, otp, password}) =>
  axios.post(
    API.changePassword,
    {email: email, otp: otp, password: password},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': `application/json`,
      },
    },
  );

export const registration = async ({
  name,
  lastName,
  email,
  phoneNum,
  address,
  password,
  repeatPassword,
}) => {
  console.log(
    name,
    lastName,
    email,
    phoneNum,
    address,
    password,
    repeatPassword,
  );
  try {
    const obj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        last_name: lastName,
        email,
        ballot: 'testing',
        telephone: phoneNum,
        address,
        password,
        password_confirmation: repeatPassword,
      }),
    };

    const response = await fetch(API.signup, obj);

    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData?.errors[0]?.message || 'Registration failed');
    }
  } catch (e) {
    throw e;
  }
};
