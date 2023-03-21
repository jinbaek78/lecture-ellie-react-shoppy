import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';
import useCarts from '../hooks/useCarts';

const SHIPPING = 3000;
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
  console.log('My cart called');
  const { uid } = useAuthContext();
  const {
    cartQuery: { isLoading, data: products },
  } = useCarts();

  if (isLoading) return <p>Loading....</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice = products
    ? products
        .map((product) => product.price * product.quantity)
        .reduce((prev, current) => prev + current)
    : 0;

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        My Cart
      </p>
      {!hasProducts && (
        <p>There is no products in your cart. Please do your best shopping!</p>
      )}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16">
            <PriceCard text="Total Price" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="Shipping Fee" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="Final Price" price={totalPrice + SHIPPING} />
          </div>
          <Button text="Place Order" />
        </>
      )}
    </section>
  );
};

export default MyCart;
