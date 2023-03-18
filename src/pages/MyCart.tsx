import { ReactNode } from 'react';

export type CartProduct = {
  id: string;
  image: string;
  title: string;
  price: number;
  option: string;
  quantity: number;
};
type MyCartProps = {};
const MyCart = ({}: MyCartProps) => {
  return <div>My Cart</div>;
};

export default MyCart;
