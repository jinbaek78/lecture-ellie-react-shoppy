import { ReactNode } from 'react';
import { useUserInfo } from '../context/UserContext';

type UserInfoProps = {};
const UserInfo = ({}: UserInfoProps) => {
  const { userInfo } = useUserInfo();
  // const {displayName, photoURL} = userInfo
  return (
    <div className="flex items-center mr-7">
      <img
        className="w-5 h-5 rounded-full mr-1"
        src={userInfo?.photoURL || ''}
      />
      <p className="text-sm">{userInfo?.displayName}</p>
    </div>
  );
};

export default UserInfo;
