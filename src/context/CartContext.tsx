import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addToCart,
  decreaseItemCount,
  deleteItem,
  getRawProducts,
  increaseItemCount,
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
  cartCount: number | null;
  onAdd: (cartInfo: CartType, callback: () => void) => void;
  onIncrease: (cartItem: CartProductType) => void;
  onDecrease: (cartItem: CartProductType) => void;
  onDelete: (productId: string) => void;
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
  const cartCount = !user || !cart ? null : cart.length;
  const handleAdd = (cartInfo: CartType, callback: () => void) => {
    if (user) {
      return addToCart(user.uid, cartInfo, callback);
    }
    console.log('You have to login first');
  };
  const handleIncrease = (cartItem: CartProductType) => {
    return increaseItemCount(user?.uid, cartItem);
  };

  const handleDecrease = (cartItem: CartProductType) => {
    if (cartItem.count === 1) {
      return;
    }
    return decreaseItemCount(user?.uid, cartItem);
  };

  const handleDelete = (productId: string) => deleteItem(user?.uid, productId);
  if (!user && cart) {
    setCart(null);
  }

  useEffect(() => {
    let unSubscribeCart: () => void;
    if (user) {
      unSubscribeCart = subscribeCart(user.uid, rawProducts, setCart);
    }
    return () => unSubscribeCart && unSubscribeCart();
  }, [user, rawProducts]);
  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        onAdd: handleAdd,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
        onDelete: handleDelete,
      }}
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
