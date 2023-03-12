import { createContext, ReactNode, useContext } from 'react';
import { addToCartsDB } from '../api/firebase';
import { useAuthContext } from './AuthContext';

export type CartType = { productId: string; selected: string; count: number };
type CartContextType = {
  addToCart: (cartInfo: CartType, callback: () => void) => void;
};
const CartContext = createContext<CartContextType | null>(null);

type CartContextProviderProps = {
  children: ReactNode;
};
const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const { user } = useAuthContext();
  const addToCart = (cartInfo: CartType, callback: () => void) => {
    if (user) {
      return addToCartsDB(user.uid, cartInfo, callback);
    }
    //
    console.log('You have to login first');
  };
  return (
    <CartContext.Provider value={{ addToCart }}>
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
