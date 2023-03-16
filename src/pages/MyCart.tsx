import { ReactNode } from 'react';
import CartProduct from '../components/CartProduct';
import Prices from '../components/Price';
import Button from '../components/ui/Button';
import { useCartContext } from '../context/CartContext';

type MyCartProps = {};
const MyCart = ({}: MyCartProps) => {
  const { cart, onIncrease, onDelete, onDecrease } = useCartContext();
  const totalPrices = cart
    ? cart
        .map((item) => item.price * item.count)
        .reduce(
          (totalPrice: number, currentPrice: number) =>
            totalPrice + currentPrice
        )
    : 0;

  return (
    <div className="w-full h-full flex flex-col p-6">
      <h1 className="text-4xl text-center border-b border-gray-300 pb-4 my-2">
        My Cart
      </h1>
      <section>
        {cart &&
          cart.map((item) => (
            <CartProduct
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onDelete={onDelete}
              key={item.productId}
            />
          ))}
      </section>
      <section>
        <Prices total={totalPrices} />
      </section>
      <Button text="Place order" />
    </div>
  );
};

export default MyCart;
