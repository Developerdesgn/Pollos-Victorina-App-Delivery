import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const baseURL = 'https://pv.slgrd.com/api';


export default API = {
  // authentication management
  signup: `${baseURL}/auth/register`,
  login: `${baseURL}/auth/login`,
  getProduct:`${baseURL}/product-by-category`,
  getCategory:`${baseURL}/categories`,
  getRelatedProductsById:`${baseURL}/related-products`,
  getCart:`${baseURL}/cart`,
  addtocart:`${baseURL}/add-to-cart`,
  updateCart:`${baseURL}/update-cart`,
  removefromcart:`${baseURL}/remove-from-cart`,
  placeOrder:`${baseURL}/place-order`,
  scheduleOrder:`${baseURL}/schedule-order`,
  getMyOrders:`${baseURL}/my-orders`,
  rateProduct:`${baseURL}/rate-product`,
  rateRider:`${baseURL}/rate-rider`,
  getAddressList:`${baseURL}/address`,
  storeAdress:`${baseURL}/address`,
  updateAddress:`${baseURL}/address`,
  deleteAddress:`${baseURL}/address`
};


export const  networkCheck=(error)=>{
  // console.log('erriir', error?.response?.data),
  NetInfo.fetch().then(state => {
    state.isConnected === false &&
      Alert.alert( 'No Internet Connection');
  });
}