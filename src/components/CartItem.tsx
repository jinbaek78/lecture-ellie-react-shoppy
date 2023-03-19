import { ReactNode } from 'react';
import { CartProduct } from '../pages/MyCart';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { addOrUpdateToCart, removerFromCart } from '../api/firebase';

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
    <li>
      <img src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{option}</p>
        <div>
          <AiOutlineMinusSquare onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} />
          <RiDeleteBin5Fill onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
