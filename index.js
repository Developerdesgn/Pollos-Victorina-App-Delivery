/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {initApp} from './firebase';

initApp();

AppRegistry.registerComponent(appName, () => App);
