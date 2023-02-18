import { initializeApp } from 'firebase/app';
import {
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
};

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export const db = getDatabase(app);

export function fetchAdminUid(callback: (adminUid: string) => void) {
  const adminRef = ref(db, '/admin');
  return onValue(
    adminRef,
    (snapshot) => {
      const data = snapshot.val();
      console.log('data: ', data);
      if (data) {
        callback(data);
      }
    },
    { onlyOnce: true }
  );
}
