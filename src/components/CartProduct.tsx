import { CartProductType } from '../context/CartContext';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { TbTrashXFilled } from 'react-icons/tb';
type CartProductProps = {
  item: CartProductType;
};
const CartProduct = ({
  item: { productId, selected, count, image, title, price },
}: CartProductProps) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 p-5">
      <div className="w-full flex items-center gap-3">
        <img className="w-32 rounded-md" src={image} />
        <div>
          <p>{title}</p>
          <p className="text-brand font-bold">{selected}</p>
          <p>₩{price}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center cursor-pointer text-xl">
        <AiOutlineMinusSquare />
        <p>{count}</p>
        <AiOutlinePlusSquare />
        <TbTrashXFilled />
      </div>
    </div>
  );
};

export default CartProduct;
