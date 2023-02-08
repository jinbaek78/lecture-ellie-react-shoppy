import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IDataBase } from '../db/DataBase';
import { CartType, MessageType } from '../pages/ProductDetail';
import { useDB } from './DbContext';
import { useUserInfo } from './UserContext';

type CartContextType = {
  cart: CartType[] | null;
  count: number;
  addToCart: (
    data: CartItemType,
    updateMessage: (message: MessageType) => void
  ) => void;
};

type CartItemType = {
  id: string;
  option: string;
  count: number;
};

const cartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: ReactNode;
};
const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartType[] | null>(null);
  const { userInfo } = useUserInfo();
  const { db } = useDB();
  const handleAddToCart = (
    data: CartItemType,
    updateMessage: (message: MessageType) => void
  ) => {
    if (!userInfo) {
      return updateMessage('You have to sigin first');
    }
    // add loading spinner here
    db.updateCart(data, userInfo.uid).then(() =>
      updateMessage(
        '✅Item you selected has successfully been added to the cart'
      )
    );
  };

  useEffect(() => {
    if (userInfo) {
      console.log('userInfo in cart context: ', userInfo);
      const unSubscribeCart = db.subscribeCart(userInfo.uid, setCart);
      return () => unSubscribeCart();
      //
    }
  }, [userInfo]);
  return (
    <cartContext.Provider
      value={{
        cart,
        count: cart ? cart.length : 0,
        addToCart: handleAddToCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  const cart = useContext(cartContext);
  if (cart) {
    return cart;
  }
  throw Error('something went wrong');
};
