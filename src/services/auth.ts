import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from '../config/firebase';
import { UserInfo } from '../contexts/UserContext';

export interface IAuth {
  loginWithGoogle: (
    callback: (user: UserInfo, token: string) => void
  ) => Promise<void>;
  logout: (callback: () => void) => void;
}

export default class Auth implements IAuth {
  constructor() {}

  async logout(callback: () => void) {
    const auth = getAuth();
    return signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('you have successfully signed out');
        callback();
      })
      .catch((error) => {
        // An error happened.
        console.log('error: ', error);
      });
  }
  async loginWithGoogle(callback: (user: UserInfo, token: string) => void) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    return signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user: User = result.user;

        let token;
        if (user) {
          const { uid, displayName, photoURL } = user;
          token = await user.getIdToken();
          callback({ uid, displayName, photoURL }, token);
        }
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        console.log('credential: ', credential);
        console.log('token: ', await user.getIdToken());
        console.log('user: ', user);
        // localStorage.setItem('token',credential?.idToken)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log('error: ', error);
      });
  }
}
