import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IDataBase } from '../db/DataBase';
import { CartType, MessageType } from '../pages/ProductDetail';
import { ProductType, useProducts } from './ProductsContext';
import { useUserInfo } from './UserContext';

type CartContextType = {
  cart: CartType[] | undefined;
  count: number;
  addToCart: (
    data: CartType,
    updateMessage: (message: MessageType) => void
  ) => void;
};

export type RawCartItemType = {
  [key: string]: CartType;
};
type CartItemType = CartType & {
  name: string;
  imgURL: string;
  price: number;
};

const cartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  db: IDataBase;
  children: ReactNode;
};
const CartProvider = ({ db, children }: CartProviderProps) => {
  const [rawCart, setRawCart] = useState<CartType[] | null>(null);
  const { userInfo } = useUserInfo();
  const { getProductInfo } = useProducts();
  const cart: CartItemType[] | undefined = rawCart?.map(
    (item: CartType): CartItemType => {
      const product: ProductType | undefined = getProductInfo(item.id);
      if (product) {
        const { name, price } = product;
        const imgURL = product.imgURL || '';
        return { ...item, imgURL, name, price };
      }
      throw Error('something went wrong');
    }
  );
  const handleAddToCart = (
    data: CartType,
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
      const unSubscribeCart = db.subscribeCart(userInfo.uid, setRawCart);
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
