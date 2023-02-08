import { ReactNode } from 'react';
import CartItem from '../components/CartItem';
import Product from '../components/Product';
import { useCart } from '../context/CartContext';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import PriceInfo from '../components/PriceInfo';

type CartsProps = {};
const Carts = ({}: CartsProps) => {
  const { cart } = useCart();

  return (
    <div className="p-5 w-full h-full">
      <p className="mb-2 text-center text-2xl font-semibold">My Cart</p>
      <ul className=" p-4 px-4 border-y border-y-zinc-300">
        {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
      </ul>
      <div className="w-5/6 m-auto my-5 h-22 flex justify-evenly ">
        <PriceInfo title="Total Products" price={50000} />
        <AiFillPlusCircle className="self-center text-2xl" />
        <PriceInfo title="Shipment fee" price={50000} />
        <FaEquals className="self-center text-2xl" />
        <PriceInfo title="Total Price" price={50000} />
      </div>
      <div className="w-full flex justify-center pb-5">
        <button className="w-11/12 h-10 mt-2 bg-[#4abad9] text-white">
          <p className="text-xl">Order</p>
        </button>
      </div>
    </div>
  );
};

export default Carts;
