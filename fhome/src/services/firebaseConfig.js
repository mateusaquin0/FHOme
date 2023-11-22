// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyC8MfHy8gOua7v3yshLvE3Hw7xOA1RZxTA',
  authDomain: 'fhome-c31ed.firebaseapp.com',
  projectId: 'fhome-c31ed',
  storageBucket: 'fhome-c31ed.appspot.com',
  messagingSenderId: '215249092810',
  appId: '1:215249092810:web:2e7908830a883eb394b433',
  measurementId: 'G-9TVYSXCEFP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const auth = getAuth(app);
export const db = getFirestore(app);
