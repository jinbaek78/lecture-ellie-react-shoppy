import { ReactNode } from 'react';
import { useCartContext } from '../context/CartContext';

type MyCartProps = {};
const MyCart = ({}: MyCartProps) => {
  const { cart } = useCartContext();
  console.log('My cart: ', cart);
  return <div>My Cart</div>;
};

export default MyCart;
