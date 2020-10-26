import { apps, initializeApp } from 'firebase';

if (!apps.length) {
  initializeApp({
    apiKey: 'AIzaSyCi2016lkCckyu4Sc11LtObxrzzEyS-JHY',
    authDomain: 'poc-expo-ant-auth.firebaseapp.com',
    databaseURL: 'https://poc-expo-ant-auth.firebaseio.com',
    projectId: 'poc-expo-ant-auth',
    storageBucket: 'poc-expo-ant-auth.appspot.com',
    messagingSenderId: '840594218977',
    appId: '1:840594218977:web:272afee93a93df4f2dbca0',
    measurementId: 'G-N3F0MNV22H',
  });
}

export {}
