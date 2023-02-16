// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: import.meta.env.VITE_DB_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  getIdToken,
  signOut,
  type User,
} from 'firebase/auth';

// export type { User } from 'firebase/auth';
