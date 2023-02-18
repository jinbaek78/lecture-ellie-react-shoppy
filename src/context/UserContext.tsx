import { User as UserType } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchAdminUid, onUserStateChange } from '../api/firebase';

type UserContextType = {
  user: UserType | null;
  isAdmin: boolean;
};
const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};
const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [adminUid, setAdminUid] = useState<string>('');
  const isAdmin = user && adminUid ? user.uid === adminUid : false;
  useEffect(() => {
    onUserStateChange(setUser);
    fetchAdminUid(setAdminUid);
  }, []);
  return (
    <UserContext.Provider value={{ user, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export function useUser(): UserContextType {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw Error('userContext has not been set yet');
  }
  return userContext;
}
