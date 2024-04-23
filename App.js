import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {AppDelivery, AuthScreens, IntroScreens} from './src/navigation/Stack';
import {AppContext} from './src/Providers';
import BootSplash from 'react-native-bootsplash';
import Loader from './src/components/loader';

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

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const userSetting = {
    token: token,
    setToken: setToken,
    loading: loading,
    setLoading: setLoading,
    userData: userData,
    setUserData: setUserData,
  };
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   checkNotPer();
  // }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = await AsyncStorage.getItem('userData');

    console.log(token, data);

    if (JSON.parse(data)) {
      setUserData(JSON.parse(data));
    }
    if (token) {
      // setTimeout(() => {
      setToken(token);
      // }, 1000);
    }
  };
  return (
    <AppContext.Provider value={userSetting}>
      {loading ? <Loader /> : null}
      <NavigationContainer>
        {!token ? <AuthScreens /> : <AppDelivery />}
      </NavigationContainer>
    </AppContext.Provider>
    // <Text>Maaz</Text>
  );
};
export default App;
