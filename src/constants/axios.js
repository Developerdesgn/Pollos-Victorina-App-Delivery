import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

const baseURL = 'https://pv.slgrd.com/api';

export default API = {
  // authentication management
  signup: `${baseURL}/auth/register`,
  login: `${baseURL}/auth/login`,
  forgetPassword: `${baseURL}/auth/forget-password`,
  orderinProgress: `${baseURL}/auth/orders-in-progress`,
};

export const networkCheck = error => {
  // console.log('erriir', error?.response?.data),
  NetInfo.fetch().then(state => {
    state.isConnected === false && Alert.alert('No Internet Connection');
  });
};
