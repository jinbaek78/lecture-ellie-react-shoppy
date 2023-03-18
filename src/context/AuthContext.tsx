import { User as UserType } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

type AuthContextType = {
  user: (UserType & { isAdmin: boolean }) | null;
  uid: string | null;
  login: () => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<(UserType & { isAdmin: boolean }) | null>(
    null
  );

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export function useAuthContext(): AuthContextType {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw Error('AuthContext has not been set yet');
  }
  return authContext;
}
