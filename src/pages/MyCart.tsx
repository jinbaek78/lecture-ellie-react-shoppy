import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

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
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery<
    Promise<unknown[]>,
    string,
    CartProduct[]
  >(['carts'], () => getCart(uid));

  if (isLoading) return <p>Loading....</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice = products
    ? products
        .map((product) => product.price * product.quantity)
        .reduce((prev, current) => prev + current)
    : 0;

  return (
    <section>
      <p>My Cart</p>
      {!hasProducts && (
        <p>There is no products in your cart. Please do your best shopping!</p>
      )}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text="Total Price" price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text="Shipping Fee" price={SHIPPING} />
            <FaEquals />
            <PriceCard text="Final Price" price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </section>
  );
};

export default MyCart;
