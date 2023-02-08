import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import PriceInfo from '../components/PriceInfo';

type CartsProps = {};
const Carts = ({}: CartsProps) => {
  const { cart, updateCount, deleteCartItem } = useCart();
  const PRODUCTS_PRICE = cart
    ?.map((item) => item.count * item.price)
    .reduce((acc, cur) => acc + cur);

  const SHIPMENT_FEE = PRODUCTS_PRICE! >= 20000 ? 0 : 3000;
  const TOTAL_PRICE = PRODUCTS_PRICE ? PRODUCTS_PRICE + SHIPMENT_FEE : 0;
  console.log('TotalProductsPrice:', PRODUCTS_PRICE);

  return (
    <div className="p-5 w-full h-full">
      <p className="mb-2 text-center text-2xl font-semibold">My Cart</p>
      {cart && (
        <>
          <ul className=" p-4 px-4 border-y border-y-zinc-300">
            {cart &&
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateCount={updateCount}
                  onDeleteItem={deleteCartItem}
                />
              ))}
          </ul>
          <div className="w-5/6 m-auto my-5 h-22 flex justify-evenly ">
            <PriceInfo title="Total Products" price={PRODUCTS_PRICE || 0} />
            <AiFillPlusCircle className="self-center text-2xl cu" />
            <PriceInfo
              title="Shipment fee"
              price={SHIPMENT_FEE}
              isFree={SHIPMENT_FEE === 0}
            />
            <FaEquals className="self-center text-2xl" />
            <PriceInfo title="Total Price" price={TOTAL_PRICE || 0} />
          </div>
          <div className="w-full flex justify-center pb-5">
            <button className="w-11/12 h-10 mt-2 bg-[#4abad9] text-white">
              <p className="text-xl">Order</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carts;
