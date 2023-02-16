import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IAuth } from '../services/auth';
import { User } from '../config/firebase';
import { IStorage } from '../db/storage';
import jwt_decode from 'jwt-decode';

type decodedUserInfoType = {
  exp: number;
  iat: number;
  name: string;
  picture: string;
  user_id: string;
};

export type UserInfo = Pick<User, 'uid' | 'displayName' | 'photoURL'>;

export type UserContextType = UserInfo & {
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const emptyUser: UserInfo = {
  uid: '',
  photoURL: '',
  displayName: '',
};
type UserProviderProps = {
  children: ReactNode;
  authService: IAuth;
  storage: IStorage;
};

const UserProvider = ({
  children,
  authService,
  storage,
}: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(emptyUser);
  const login = () => {
    authService.loginWithGoogle((userInfo: UserInfo, token: string) => {
      setUserInfo(userInfo);
      storage.saveToken(token);
    });
  };
  const logout = () => {
    authService.logout(() => {
      setUserInfo(emptyUser);
      storage.removeToken();
    });
  };

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      let decoded;
      try {
        decoded = jwt_decode<decodedUserInfoType>(token);
        const {
          name: displayName,
          picture: photoURL,
          user_id: uid,
          exp,
        } = decoded;
        const currentSecondTimes = Date.now() / 1000;
        if (currentSecondTimes > exp) {
          console.log('The Token you have is expired');
          storage.removeToken();
          return;
        }
        console.log('decoded: ', decoded);
        setUserInfo({ displayName, photoURL, uid });
      } catch (err) {
        console.log('invalid token, err: ', err);
        storage.removeToken();
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ ...userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export function useUser(): UserContextType {
  const user = useContext(UserContext);
  if (user) {
    return user;
  }

  return { uid: '', photoURL: '', displayName: '', login() {}, logout() {} };
}
