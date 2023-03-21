import { ReactNode } from 'react';

type PriceCardProps = {
  text: string;
  price: number;
};
const PriceCard = ({ text, price }: PriceCardProps) => {
  return (
    <div className="bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl">
      <p>{text}</p>
      <p className="font-bold text-brand text-xl md:text-2xl">₩{price}</p>
    </div>
  );
};

export default PriceCard;
