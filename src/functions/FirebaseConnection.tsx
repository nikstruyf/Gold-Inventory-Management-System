import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDEg-P8DRQ8rIkQLEIwxXYOuhx7qBRyM1I',
  authDomain: 'gims-ed7b6.firebaseapp.com',
  projectId: 'gims-ed7b6',
  storageBucket: 'gims-ed7b6.appspot.com',
  messagingSenderId: '251042049172',
  appId: '1:251042049172:web:576dca8c5418ff15c11881',
  measurementId: 'G-VEJJQMPVTZ'
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
