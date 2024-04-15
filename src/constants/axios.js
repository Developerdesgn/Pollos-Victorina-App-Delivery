import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

const baseURL = 'https://pv.slgrd.com/api';

export default API = {
  // authentication management
  signup: `${baseURL}/auth/register`,
  login: `${baseURL}/auth/login`,
  forgetPassword: `${baseURL}/auth/forget-password`,
  forgetPassword: `${baseURL}/auth/forget-password`,
  otpcheck: `${baseURL}/auth/check-otp`,
  changePassword: `${baseURL}/auth/change-password`,
  getCount: `${baseURL}/rider-orders-count`,
  orderinProgress: `${baseURL}/rider-orders-in-progress`,
  orderinHistory: `${baseURL}/rider-orders-in-progress`,
  getCancelReasons: `${baseURL}/get-order-cancel-reasons`,
  cancelOrder: `${baseURL}/cancel-order`,
  startOrder: `${baseURL}/rider-start-order`,
  orderComplete: `${baseURL}/rider-complete-order`,
  saveRiderLocation: `${baseURL}/update-rider-current-location`,
};

export const networkCheck = error => {
  // console.log('erriir', error?.response?.data),
  NetInfo.fetch().then(state => {
    state.isConnected === false && Alert.alert('No Internet Connection');
  });
};
