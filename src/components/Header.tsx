import { ReactNode, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../context/UserContext';
import AuthService from '../service/Auth';
import UserInfo from './UserInfo';

const authService = new AuthService();

type HeaderProps = {};
const Header = ({}: HeaderProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  console.log('userInfo:', userInfo);
  //
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  const handleProductClick = () => {
    navigate('/products');
  };
  const handleCartClick = () => {
    navigate('/carts');
  };
  const handleLoginClick = () => {
    if (!userInfo) {
      return authService.signWithPopup(updateUserInfo);
    }

    authService.signOut();
  };
  useEffect(() => {
    const unSubscribe = authService.subscribeOnAuthChanged(updateUserInfo);
    return () => unSubscribe();
  }, []);
  return (
    <div className="flex justify-between p-2">
      <div
        className="flex items-center cursor-pointer text-[#4abad9]"
        onClick={handleLogoClick}
      >
        <FiShoppingBag size={20} />
        <p className="ml-1">Shoppy</p>
      </div>
      <div className=" flex items-center mr-8">
        <div
          className={userInfo ? 'flex items-center' : 'flex items-center mr-8'}
        >
          <p className="mr-2 cursor-pointer" onClick={handleProductClick}>
            Products
          </p>
          <AiOutlineShoppingCart
            className="mr-2 text-xl  font-semibold cursor-pointer"
            onClick={handleCartClick}
          />
          {userInfo && <UserInfo />}
        </div>
        <button className="text-white bg-[#4abad9] " onClick={handleLoginClick}>
          <p className="p-1 px-3 text-sm text-white font-bold">
            {userInfo ? 'Logout' : 'Login'}
          </p>
        </button>
      </div>
    </div>
  );
};

export default Header;
