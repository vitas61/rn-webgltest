/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import '@expo/browser-polyfill';
import App from './App';
import {name as appName} from './app.json';
import App2 from './App2'
import GLTest from './GLTest';
import ExpoTreeTest from './ExpoTreeTest';

import ThreeHuman from './ThreeHuman';
import ThreeHuman2 from './ThreeHuman2';



const THREE = require("three");
global.THREE = global.THREE || THREE;

AppRegistry.registerComponent(appName, () => ThreeHuman2);
