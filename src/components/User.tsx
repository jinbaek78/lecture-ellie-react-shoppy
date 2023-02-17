import { User as UserType } from 'firebase/auth';
import { ReactNode } from 'react';

type UserProps = {
  user: UserType;
};
const User = ({ user: { photoURL, displayName } }: UserProps) => {
  return (
    <div className="flex items-center">
      <img
        className="w-10 h-10 rounded-full mr-2"
        src={photoURL ?? ''}
        alt={displayName ?? ''}
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
};

export default User;
