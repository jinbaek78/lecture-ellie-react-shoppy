import { User as UserType } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onUserStateChange } from '../api/firebase';

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
  const isAdmin: boolean = validateAdmin(user?.email);
  useEffect(() => {
    onUserStateChange(setUser);
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

function validateAdmin(email: string | undefined | null): boolean {
  return email === import.meta.env.VITE_FIRE_BASE_ADMIN_EMAIL;
}
