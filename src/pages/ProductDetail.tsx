import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useDB } from '../context/DbContext';
import { useUserInfo } from '../context/UserContext';

const MESSAGE = {
  ERROR: 'You have to sigin first',
  SUCCESS: '✅Item you selected has successfully been added to the cart',
};
type MessageType =
  | 'You have to sigin first'
  | '✅Item you selected has successfully been added to the cart';
type ProductDetailProps = {};

export type CartType = {
  id: string;
  option: string;
  count: number;
};

const ProductDetail = ({}: ProductDetailProps) => {
  const [option, setOption] = useState<string>('');
  const [message, setMessage] = useState<MessageType | null>(null);
  const { userInfo } = useUserInfo();
  const { db } = useDB();
  const {
    state: { product },
  } = useLocation();
  const { category, description, id, imgURL, name, options, price } = product;
  const optionList: string[] = options.split(',');
  const handleAddClick = () => {
    // db.addTOCart
    const data = { id, option: option ? option : optionList[0], count: 1 };
    if (!userInfo) {
      return setMessage('You have to sigin first');
    }
    // add loading spinner here
    db.updateCart(data, userInfo.uid).then(() =>
      setMessage('✅Item you selected has successfully been added to the cart')
    );
  };
  useEffect(() => {
    setMessage(null);
  }, [userInfo]);
  return (
    <div className="flex flex-col w-full p-2 px-4">
      <p className="mb-3 text-slate-500">{`>${category}`}</p>
      <div className="flex w-full">
        <img className=" basis-7/12" src={imgURL} alt={name} />
        <div className="basis-5/12 p-2  px-3 ">
          <p className="text-2xl">{name}</p>
          <p className="w-ful border-b py-2 border-b-zinc-300">₩{price}</p>
          <p className="mt-2">{description}</p>
          <div className="flex my-3">
            <label>Option: </label>
            <select
              className="border border-dashed border-[#4abad9] w-full p-px"
              id={'size-select'}
              onChange={(e) => setOption(e.target.value.toLocaleLowerCase())}
            >
              {optionList.map((size) => (
                <option key={size} value={size.toUpperCase()}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={handleAddClick}
              className="w-11/12 h-8 mb-2 text-white bg-[#4abad9]"
            >
              Add to Cart
            </button>
            {message &&
              (message === MESSAGE.SUCCESS ? (
                <p className="w-11/12 h-8 ">{message}</p>
              ) : (
                <p className="w-11/12 h-8 text-red-500">{message}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
