import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {AppDelivery, AuthScreens, IntroScreens} from './src/navigation/Stack';
import {AppContext} from './src/Providers';

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  }

  const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('Old fcm Token:', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('new generated fcm Token', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log(error, 'Error');
      }
    }
  };

  const notificationService = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    // foreGround

    messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification', remoteMessage);
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
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
  };

  useEffect(() => {
    requestUserPermission();
    notificationService();
  }, []);

  const [token, setToken] = useState('');
  // const [userData, setUserData] = useState('');
  const userSetting = {
    token: token,
    setToken: setToken,
    // userData: userData,
    // setUserData: setUserData,
  };
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   checkNotPer();
  // }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    // const data = await AsyncStorage.getItem('userData');

    console.log(token);

    if (token) {
      setToken(token);
    }
    // if (JSON.parse(data)) {
    //   setUserData(JSON.parse(data));
    // }
  };
  return (
    <NavigationContainer>
      <AppContext.Provider value={userSetting}>
        {!token ? <AuthScreens /> : <AppDelivery />}
      </AppContext.Provider>
    </NavigationContainer>
    // <Text>Maaz</Text>
  );
};
export default App;
