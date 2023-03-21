import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCarts from '../hooks/useCarts';
import { CartProduct } from './MyCart';

type ProductDetailProps = {};
const ProductDetail = ({}: ProductDetailProps) => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { addOrUpdateToCart } = useCarts();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState<string>(options && options[0]);
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value);
  const handleClick = () => {
    const product: CartProduct = {
      id,
      image,
      title,
      price,
      option: selected,
      quantity: 1,
    };

    addOrUpdateToCart.mutate(product, {
      onSuccess: () => {
        setSuccessMessage('✅ This item has successfully added to your cart.');
        setTimeout(() => setSuccessMessage(''), 4000);
      },
      onError: () => {
        setErrorMessage('You have to login first');
        setTimeout(() => setErrorMessage(''), 4000);
      },
    });
  };
  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ₩{price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              options:
            </label>
            <select
              id="select"
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option: string, index: number) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text="Add to Cart" onClick={handleClick} />
          {successMessage && <p className="text-2xl my-2">{successMessage}</p>}
          {errorMessage && (
            <p className="text-red-500 text-2xl my-2">{errorMessage}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
