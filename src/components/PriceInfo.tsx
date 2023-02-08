import { ReactNode } from 'react';

type PriceInfoProps = {
  title: string;
  price: number;
};
const PriceInfo = ({ title, price }: PriceInfoProps) => {
  return (
    <div className="bg-zinc-100  w-1/5 h-20 rounded-xl flex flex-col justify-center items-center">
      <p>{title}</p>
      <p className="text-[#4abad9] font-bold">₩{price}</p>
    </div>
  );
};

export default PriceInfo;
