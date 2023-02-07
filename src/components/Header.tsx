import { ReactNode, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../context/UserContext';
import AuthService from '../service/Auth';
import UserInfo from './UserInfo';
import {
  db,
  ref,
  set,
  onValue,
  child,
  push,
  update,
  remove,
} from '../config/firebase';
import DataBase from '../db/DataBase';
const database = new DataBase();

const authService = new AuthService();

type HeaderProps = {};
const Header = ({}: HeaderProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  console.log('userInfo:', userInfo);
  const isAdmin = userInfo?.uid === import.meta.env.VITE_ADMIN_UID;
  //
  console.log('isAdmin: ', isAdmin);
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
  const handleLoginOrLogoutClick = () => {
    if (!userInfo) {
      return authService.signWithPopup(updateUserInfo);
    }

    authService.signOut();
  };
  const handlePencilClick = () => {
    navigate('/admin');
  };
  useEffect(() => {
    const unSubscribe = authService.subscribeOnAuthChanged(updateUserInfo);
    return () => unSubscribe();
  }, []);

  // useEffect(() => {
  //   if (userInfo) {
  //     // set(ref(db, 'users/' + userInfo.uid), {
  //     //   username: 'jin',
  //     //   email: 'jin@',
  //     // });
  //     // set(ref(db, 'users/' + 'abcd' + userInfo.uid), {
  //     //   username: 'jay',
  //     //   email: 'jay@',
  //     // });
  //   }
  //   // const usersRef = ref(db, 'users/');
  //   // const unSubscribe = onValue(
  //   //   usersRef,
  //   //   (snapshot) => {
  //   //     const data = snapshot.val();
  //   //     console.log('data: ', data);
  //   //     for (const key in data) {
  //   //       console.log('key: ', key);
  //   //       console.log('value: ', data[key]);
  //   //       console.log('---------');
  //   //     }
  //   //   },
  //   //   { onlyOnce: true }
  //   // );
  //   // return () => unSubscribe();

  //   // const newData = {
  //   //   title: 'somethingNew',
  //   //   email: 'somethingNew@',
  //   // };
  //   // let newKey = push(child(ref(db), 'users')).key;
  //   // const updates: any = {};
  //   // updates[`/users/${newKey}`] = newData;
  //   // newKey = push(child(ref(db), 'users')).key;
  //   // updates[`/users/${newKey}`] = {
  //   //   title: 'something2New',
  //   //   email: 'something2New@',
  //   // };

  //   // remove
  //   // remove(ref(db, 'users/-NNQ0oWuw0rCfk7nWmn6'));

  //   // list add
  //   // const usersRef = ref(db, 'somethingNew');
  //   // const newUsersRef = push(usersRef);
  //   // set(newUsersRef, {
  //   //   email: 'somethingNew@',
  //   //   title: 'somethingNew',
  //   // });
  //   // return;
  //   remove(ref(db, 'somethingNew/-NNQUUxY_WSUXJYc_NFS'));
  // }, []);

  useEffect(() => {
    // database.updateProduct(product);
    // database.updateCart(product, 'jin');
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
          <AiOutlineShoppingCart
            className="mr-2 text-xl  font-semibold cursor-pointer"
            onClick={handleCartClick}
          />
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
