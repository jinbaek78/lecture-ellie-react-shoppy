import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartType } from '../pages/ProductDetail';
import { useDB } from './DbContext';
import { useUserInfo } from './UserContext';

type CartContextType = {
  cart: CartType[] | null;
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

  useEffect(() => {
    if (userInfo) {
      console.log('userInfo in cart context: ', userInfo);
      const unSubscribeCart = db.subscribeCart(userInfo.uid, setCart);
      return () => unSubscribeCart();
      //
    }
  }, [userInfo]);
  return (
    <cartContext.Provider value={{ cart, count: cart ? cart.length : 0 }}>
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
