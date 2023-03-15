import { ReactNode } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import PriceCard from './ui/PriceCard';

type PriceProps = {
  total: number;
};
const Price = ({ total }: PriceProps) => {
  const shippingFee = total >= 20000 ? 0 : 3000;
  return (
    <section className="flex justify-evenly items-center text-xl py-5">
      <PriceCard text="Total Price" price={total} />
      <AiFillPlusCircle />
      <PriceCard
        text="Shipping fee"
        isFree={shippingFee === 0}
        price={shippingFee}
      />
      <FaEquals />
      <PriceCard text="Final Price" price={total + shippingFee} />
    </section>
  );
};

export default Price;
