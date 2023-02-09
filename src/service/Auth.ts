import {
  Auth,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserInfo,
  signOut,
} from '../config/firebase';

export default class AuthService {
  private auth: Auth = getAuth();
  constructor() {}

  async signWithPopup(updateUserInfo: (user: UserInfo) => void) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        updateUserInfo(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async signOut(callback: () => void) {
    signOut(this.auth);
    callback && callback();
  }
}
