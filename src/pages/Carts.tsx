import { ReactNode } from 'react';
import { useCart } from '../context/CartContext';

type CartsProps = {};
const Carts = ({}: CartsProps) => {
  const { cart } = useCart();
  console.log('in carts, cart: ', cart);
  return <div>Cart</div>;
};

export default Carts;
