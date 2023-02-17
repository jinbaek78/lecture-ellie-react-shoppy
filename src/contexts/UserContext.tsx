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
import * as jose from 'jose';

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
      updateToDecoded(token, setUserInfo);
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

const updateToDecoded = async (
  token: string,
  callback: (userInfo: UserInfo) => void
) => {
  try {
    const publicKey = await jose.importX509(
      import.meta.env.VITE_FIRE_BASE_PUBLICK_KEY_X509,
      import.meta.env.VITE_FIRE_BASE_PUBLICK_KEY_ALGORITHM
    );
    const {
      payload: { name, picture, user_id },
    } = await jose.jwtVerify(token, publicKey);
    const displayName = name as string;
    const photoURL = picture as string;
    const uid = user_id as string;
    callback({ displayName, photoURL, uid });
  } catch (err) {
    console.log('error: ', err);
  }
};
