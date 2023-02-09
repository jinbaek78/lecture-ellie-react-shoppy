import { UserInfo } from '../config/firebase';
import { createContext, ReactNode, useContext, useState } from 'react';

type userContextType = {
  userInfo: UserInfo | null;
  updateUserInfo: (useInfo: UserInfo | null) => void;
};
const userContext = createContext<userContextType | null>(null);
type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  return (
    <userContext.Provider value={{ userInfo, updateUserInfo: setUserInfo }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useUserInfo = (): userContextType => {
  const userInfo = useContext(userContext);
  if (userInfo) {
    return userInfo;
  }
  throw Error('Something went wrong');
};
