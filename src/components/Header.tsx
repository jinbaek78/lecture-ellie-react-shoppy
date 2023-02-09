import { useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import AuthService from '../service/Auth';
import UserInfo from './UserInfo';

const authService = new AuthService();

type HeaderProps = {};
const Header = ({}: HeaderProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  const { count } = useCart();
  const isAdmin = userInfo?.uid === import.meta.env.VITE_ADMIN_UID;

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  const handleProductClick = () => {
    navigate('/products');
  };
  const handleCartClick = () => {
    if (!userInfo) {
      return;
    }
    navigate('/carts');
  };
  const handleLoginOrLogoutClick = () => {
    if (!userInfo) {
      return authService.signWithPopup(updateUserInfo);
    }

    authService.signOut(() => updateUserInfo(null));
  };
  const handlePencilClick = () => {
    navigate('/admin');
  };
  useEffect(() => {
    const unSubscribe = authService.subscribeOnAuthChanged(updateUserInfo);
    return () => unSubscribe();
  }, []);

  //
  useEffect;
  return (
    <div className="flex justify-between p-2 relative">
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
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <AiOutlineShoppingCart className="mr-2 text-xl font-semibold cursor-pointer" />
            {count !== 0 && (
              <div className="w-4 h-4 absolute bg-[#4abad9] rounded-full flex  justify-center items-center bottom-2 left-3">
                <p className=" text-sm text-white ">{count}</p>
              </div>
            )}
          </div>

          {isAdmin && (
            <BsFillPencilFill
              className="mx-2 cursor-pointer"
              onClick={handlePencilClick}
            />
          )}
          {userInfo && <UserInfo />}
        </div>
        <button
          className="text-white bg-[#4abad9] "
          onClick={handleLoginOrLogoutClick}
        >
          <p className="p-1 px-3 text-sm text-white font-bold">
            {userInfo ? 'Logout' : 'Login'}
          </p>
        </button>
      </div>
      <div className="absolute w-full h-px bottom-0 bg-zinc-300"></div>
    </div>
  );
};

export default Header;
