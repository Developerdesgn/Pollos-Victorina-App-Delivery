import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {AppDelivery, AuthScreens, IntroScreens} from './src/navigation/Stack';
import {AppContext} from './src/Providers';
import BootSplash from 'react-native-bootsplash';
import Loader from './src/components/loader';
import BackgroundService from 'react-native-background-actions';
import {RiderServices} from './src/services';
import {networkCheck} from './src/constants/axios';
import Geolocation from '@react-native-community/geolocation';
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).

const App = () => {
  const appState = useRef(AppState.currentState);
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
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, [token]);

  const handleAppStateChange = async nextAppState => {
    if (nextAppState === 'active') {
      console.log('App is in the foreground');
      await BackgroundService.stop();
    } else {
      if (token) {
        console.log('App is in the background', token);
        await BackgroundService.start(
          async taskDataArguments => {
            // Example of an infinite loop task
            const {delay} = taskDataArguments;
            await new Promise(async resolve => {
              for (let i = 0; BackgroundService.isRunning(); i++) {
                getaddress();
                await sleep(5000);
              }
            });
          },
          {
            taskName: 'Example',
            taskTitle: 'ExampleTask title',
            taskDesc: 'ExampleTask description',
            taskIcon: {
              name: 'ic_launcher',
              type: 'mipmap',
            },
            color: '#ff00ff',
            linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
            parameters: {
              delay: 1000,
            },
          },
        );
      }
    }
  };

  const getaddress = () => {
    Geolocation.getCurrentPosition(info => {
      // console.log(info, 'coords');

      saveRiderLocation({
        latitude: info?.coords?.latitude,
        longitude: info?.coords?.longitude,
      });
    });
  };

  const saveRiderLocation = async ({latitude, longitude}) => {
    // context.setLoading(true);
    const body = {
      latitude: latitude,
      longitude: longitude,
    };

    await RiderServices.saveRiderLocation({body: body, token: token})
      .then(async res => {
        // console.log(res?.data, 'saved loc');
        // setHistoryOrder(res?.data);
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      });
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
    // backGroundTask();
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
