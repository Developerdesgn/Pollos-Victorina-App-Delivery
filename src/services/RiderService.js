import axios from 'axios';
import {API} from '../constants';

export const getOrders = ({token}) => {
  //   console.log(token, 'token11');

  return axios.post(API.addtocart, cart, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCart = ({token}) => {
  // console.log(device_token, 'token11');
  return axios.get(API.getCart, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};
