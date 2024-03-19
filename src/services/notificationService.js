import React from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkNotPer = async () => {
  const checkPermission = await AsyncStorage.getItem('permission');
  askForPermission(checkPermission);
};

export const askForPermission = checkPermission => {
  if (checkPermission == 'granted') {
  } else {
    const checkAndRequestNotificationPermission = async () => {
      try {
        const status = await check(
          Platform.OS === 'android'
            ? PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            : PERMISSIONS.IOS.NOTIFICATIONS,
        );
        if (status === RESULTS.GRANTED) {
          // console.log('status', status);
          await AsyncStorage.setItem('permission', 'granted');
          console.log('Notification permission already granted');
        } else {
          await requestNotificationPermission();
        }
      } catch (error) {
        console.log('Error checking notification permission: ', error);
      }
    };
    checkAndRequestNotificationPermission();
  }
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Notification permission granted');
        await AsyncStorage.setItem('permission', 'granted');
      } else {
        // console.log('Notification permission denied');
        await AsyncStorage.setItem('permission', 'denied');
      }
    } else {
      const status = await request(PERMISSIONS.IOS.NOTIFICATIONS);
      if (status === RESULTS.GRANTED) {
        await AsyncStorage.setItem('permission', 'granted');

        // console.log('Notification permission granted');
      } else {
        await AsyncStorage.setItem('permission', 'denied');
        // console.log('Notification permission denied');
      }
    }
  } catch (error) {
    console.log('Error requesting notification permission: ', error);
  }
};

export const notificationService = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  console.log('confgs');

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  // foreGround

  messaging().onMessage(async remoteMessage => {
    console.log('confg');
    console.log('Foreground Notification', remoteMessage);
    Alert.alert(remoteMessage?.notification?.title);
    // setNotificationDot(true);
    // toast.show({
    //   placement: 'top',
    //   render: ToastMessage,
    // });
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });
};

export const checkToken = async setFcm => {
  const fcmToken = await messaging().getToken();
  console.log(fcmToken);
  if (fcmToken) {
    setFcm(fcmToken);
    // dispatch(setFToken(fcmToken));
  }
};
