import { ReactNode } from 'react';
import { CartItemType } from '../context/CartContext';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
type CartItemProps = {
  item: CartItemType;
};
const CartItem = ({ item }: CartItemProps) => {
  const { count, imgURL, name, option, price } = item;
  console.log('item: ', item);
  return (
    <div className="flex justify-between mb-2">
      <div className="flex">
        <img src={imgURL} alt={name} />
        <div className="ml-2 self-center">
          <p className="text-xl">{name}</p>
          <p className=" font-bold text-lg text-[#4abad9]">
            {option.toUpperCase()}
          </p>
          <p>₩{price}</p>
        </div>
      </div>
      <div className="flex self-center items-center text-xl">
        <AiOutlineMinusSquare className="mr-2" />
        <p className="mr-2">{count}</p>
        <AiOutlinePlusSquare className="mr-4" />
        <RiDeleteBin6Fill />
      </div>
    </div>
  );
};

export default CartItem;
