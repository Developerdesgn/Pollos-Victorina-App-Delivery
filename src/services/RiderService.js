import axios from 'axios';
import {API} from '../constants';

export const getOrders = ({token}) => {
  //   console.log(token, 'token11');

  return axios.get(API.orderinProgress, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistoryOrders = ({token}) => {
  //   console.log(token, 'token11');

  return axios.get(API.orderinHistory, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCount = ({token}) => {
  console.log(token, 'token11');
  return axios.get(API.getCount, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCancelReasons = ({token}) => {
  return axios.get(API.getCancelReasons, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelOrder = ({reasons, token}) => {
  return axios.post(API.cancelOrder, reasons, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const startOrder = ({id, token}) => {
  return axios.post(
    `${API.startOrder}/${id}`,
    {},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': `application/json`,
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const orderComplete = ({id, token}) => {
  return axios.post(
    `${API.orderComplete}/${id}`,
    {},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': `application/json`,
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const saveRiderLocation = ({body, token}) => {
  return axios.post(API.saveRiderLocation, body, {
    headers: {
      Accept: 'application/json',
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};
