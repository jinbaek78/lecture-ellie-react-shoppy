// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDF-50ffYL9XkMxducI6lQ_t69EY3-vXv4',
  authDomain: 'shoppy-9d187.firebaseapp.com',
  projectId: 'shoppy-9d187',
  storageBucket: 'shoppy-9d187.appspot.com',
  messagingSenderId: '686122458843',
  appId: '1:686122458843:web:ba759e0d270b235106b6fe',
  databaseURL:
    'https://shoppy-9d187-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

//
export {
  GoogleAuthProvider,
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
export type { Auth } from 'firebase/auth';
export type { UserInfo } from 'firebase/auth';
