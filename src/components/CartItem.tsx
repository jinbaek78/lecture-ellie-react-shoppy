import { ReactNode } from 'react';
import { CartItemType } from '../context/CartContext';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
type CartItemProps = {
  item: CartItemType;
  onUpdateCount: (data: CartItemType, type: 'UP' | 'DOWN') => void;
  onDeleteItem: (id: string) => void;
};
const CartItem = ({ item, onUpdateCount, onDeleteItem }: CartItemProps) => {
  const { count, imgURL, name, option, price, id } = item;
  return (
    <div className="max-h-44 flex justify-between mb-2">
      <div className="flex">
        <img src={imgURL} alt={name} width="200" height="200" />
        <div className="ml-2 self-center">
          <p className="text-xl">{name}</p>
          <p className=" font-bold text-lg text-[#4abad9]">
            {option.toUpperCase()}
          </p>
          <p>₩{price}</p>
        </div>
      </div>
      <div className="flex self-center items-center text-xl">
        <AiOutlineMinusSquare
          className="mr-2 cursor-pointer"
          onClick={() => onUpdateCount(item, 'DOWN')}
        />
        <p className="mr-2">{count}</p>
        <AiOutlinePlusSquare
          className="mr-4 cursor-pointer"
          onClick={() => onUpdateCount(item, 'UP')}
        />
        <RiDeleteBin6Fill
          className="cursor-pointer"
          onClick={() => onDeleteItem(id)}
        />
      </div>
    </div>
  );
};

export default CartItem;
