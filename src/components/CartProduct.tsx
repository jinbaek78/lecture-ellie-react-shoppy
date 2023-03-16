import { CartProductType } from '../context/CartContext';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { TbTrashXFilled } from 'react-icons/tb';
type CartProductProps = {
  item: CartProductType;
  onIncrease: (cartItem: CartProductType) => void;
  onDecrease: (cartItem: CartProductType) => void;
  onDelete: (productId: string) => void;
};
const CartProduct = ({
  onIncrease,
  onDecrease,
  onDelete,
  item,
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
        <AiOutlineMinusSquare onClick={() => onDecrease(item)} />
        <p>{count}</p>
        <AiOutlinePlusSquare onClick={() => onIncrease(item)} />
        <TbTrashXFilled onClick={() => onDelete(productId)} />
      </div>
    </div>
  );
};

export default CartProduct;
