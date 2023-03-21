import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCarts from '../hooks/useCarts';

type CarStatusProps = {};
const CarStatus = ({}: CarStatusProps) => {
  const {
    cartQuery: { data: products },
  } = useCarts();
  console.log('cartStatus called');
  return (
    <div className=" relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {products.length}
        </p>
      )}
    </div>
  );
};

export default CarStatus;
