import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addToCartsDB,
  getProducts,
  getRawProducts,
  subscribeCart,
} from '../api/firebase';
import { ProductType } from '../pages/NewProduct';
import { useAuthContext } from './AuthContext';

export type RawProductType = {
  [key: string]: ProductType;
};
export type CartType = { productId: string; selected: string; count: number };
// imageURL, title, price, option, count
export type CartProductType = {
  productId: string;
  selected: string;
  count: number;
  image: string;
  title: string;
  price: number;
};
type CartContextType = {
  cart: CartProductType[] | null;
  cartCount: number;
  addToCart: (cartInfo: CartType, callback: () => void) => void;
};
const CartContext = createContext<CartContextType | null>(null);

type CartContextProviderProps = {
  children: ReactNode;
};
const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<CartProductType[] | null>(null);
  const { user } = useAuthContext();
  const { data: rawProducts } = useQuery<
    Promise<unknown[]>,
    string,
    RawProductType
  >(['products/raw'], getRawProducts);
  console.log('cart: ', cart);
  const addToCart = (cartInfo: CartType, callback: () => void) => {
    if (user) {
      return addToCartsDB(user.uid, cartInfo, callback);
    }
    //
    console.log('You have to login first');
  };

  useEffect(() => {
    let unSubscribeCart: () => void;
    if (user) {
      unSubscribeCart = subscribeCart(user.uid, rawProducts, setCart);
    }
    return () => unSubscribeCart && unSubscribeCart();
  }, [user, rawProducts]);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, cartCount: cart ? cart.length : 0 }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export function useCartContext(): CartContextType {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw Error('CartContext ahs not been set yet');
  }
  return cartContext;
}
