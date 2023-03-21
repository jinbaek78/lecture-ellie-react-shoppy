import { ReactNode } from 'react';
import { CartProduct } from '../pages/MyCart';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { addOrUpdateToCart, removerFromCart } from '../api/firebase';

const ICON_CLASS =
  'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

type CartItemProps = {
  uid: string | null;
  product: CartProduct;
};
const CartItem = ({
  uid,
  product,
  product: { id, image, title, option, quantity, price },
}: CartItemProps) => {
  const handleMinus = () => {
    if (quantity < 2 || !uid) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    uid && addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    uid && removerFromCart(uid, id);
  };
  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>₩{price}</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
