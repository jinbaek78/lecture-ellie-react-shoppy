import { ReactNode } from 'react';

type PriceCardProps = {
  text: string;
  price: number | string;
  isFree?: boolean;
};
const PriceCard = ({ price, text, isFree }: PriceCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-zinc-100 rounded-md">
      <p>{text}</p>
      <p className="text-brand font-bold">{isFree ? 'FREE' : price}</p>
    </div>
  );
};

export default PriceCard;
