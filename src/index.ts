import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from '../app.json';
import firebase from '@react-native-firebase/app';

AppRegistry.registerComponent(appName, () => App);

const firebaseConfig = {
  apiKey: 'AIzaSyC4M5s--mJgJO26PTmdwV_BXzsC0maINXE',
  authDomain: 'konovalukpastuhk-aeb5a.firebaseapp.com',
  databaseURL: 'https://konovalukpastuhk-aeb5a.firebaseio.com',
  projectId: 'konovalukpastuhk-aeb5a',
  storageBucket: 'konovalukpastuhk-aeb5a.appspot.com',
  messagingSenderId: '740161246196',
  appId: '1:740161246196:android:466a1cc9015d871f645fa1',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
