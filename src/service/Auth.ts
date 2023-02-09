import {
  Auth,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserInfo,
  signOut,
  onAuthStateChanged,
} from '../config/firebase';

export default class AuthService {
  private auth: Auth = getAuth();
  constructor() {}

  subscribeOnAuthChanged(updateUserInfo: (user: UserInfo | null) => void) {
    return onAuthStateChanged(this.auth, () => updateUserInfo(null));
  }

  async signWithPopup(updateUserInfo: (user: UserInfo) => void) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        updateUserInfo(result.user);
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
      });
  }

  async signOut(callback: () => void) {
    signOut(this.auth);
    callback && callback();
  }
}
