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
  cart: CartItemType[] | undefined;
  count: number;
  addToCart: (
    data: CartType,
    updateMessage: (message: MessageType) => void
  ) => void;
  updateCount: (data: CartItemType, type: 'UP' | 'DOWN') => void;
  deleteCartItem: (id: string) => void;
};

export type RawCartItemType = {
  [key: string]: CartType;
};
export type CartItemType = CartType & {
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
      throw Error('something went wrong, products doen not exist ');
    }
  );
  const count = cart ? cart.length : 0;
  const handleUpdateItemCount = (data: CartItemType, type: 'UP' | 'DOWN') => {
    let count: number = data.count;
    if ((type === 'DOWN' && count === 1) || userInfo === null) {
      return;
    }
    count = type === 'UP' ? count + 1 : count - 1;
    const cartItem: CartType = { count, id: data.id, option: data.option };
    db.updateCartItem(cartItem, userInfo.uid);
  };

  const handleDeleteItem = (id: string) => {
    if (!userInfo) {
      return;
    }

    const isLastItem = count === 1;
    if (isLastItem) {
      db.deleteCartItem(id, userInfo.uid, setRawCart);
    } else {
      db.deleteCartItem(id, userInfo.uid);
    }
  };
  const handleAddToCart = (
    data: CartType,
    updateMessage: (message: MessageType) => void
  ) => {
    if (!userInfo) {
      return updateMessage('You have to sigin first');
    }
    // add loading spinner here
    db.updateCartItem(data, userInfo.uid).then(() =>
      updateMessage(
        '✅Item you selected has successfully been added to the cart'
      )
    );
  };

  useEffect(() => {
    if (userInfo) {
      const unSubscribeCart = db.subscribeCart(userInfo.uid, setRawCart);
      return () => unSubscribeCart();
    } else {
      setRawCart(null);
    }
  }, [userInfo]);
  return (
    <cartContext.Provider
      value={{
        cart,
        count,
        addToCart: handleAddToCart,
        updateCount: handleUpdateItemCount,
        deleteCartItem: handleDeleteItem,
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
