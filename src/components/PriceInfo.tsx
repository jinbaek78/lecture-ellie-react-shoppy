type PriceInfoProps = {
  title: string;
  price: number;
  isFree?: boolean;
};

const PriceInfo = ({ title, price, isFree }: PriceInfoProps) => {
  return (
    <div className="bg-zinc-100  w-1/5 h-20 rounded-xl flex flex-col justify-center items-center">
      <p>{title}</p>
      <p className="text-[#4abad9] font-bold">
        {isFree ? 'FREE' : `₩${price}`}
      </p>
    </div>
  );
};

export default PriceInfo;
