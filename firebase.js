import firebase from '@react-native-firebase/app';

const RNfirebaseConfig = {
  apiKey: 'AIzaSyCidhwWIoJV5naZzEORkohSTzySbtRGE2A',
  //   authDomain: "pollovictorina.firebaseapp.com",
  projectId: 'pollos-app-delivery',
  storageBucket: 'pollos-app-delivery.appspot.com',
  messagingSenderId: '188653735081',
  appId: '1:188653735081:android:3217a44c2aeff9ebe16db8',
  databaseURL: 'https://pollos-app-delivery-default-rtdb.firebaseio.com',
};

export const initApp = () => {
  let app;
  if (firebase.apps.length === 0) {
    console.log('firebasec');
    app = firebase.initializeApp(RNfirebaseConfig);
  } else {
    console.log('firebasec', firebase);
    app = firebase.app();
  }
};

initApp();
