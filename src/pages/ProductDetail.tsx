import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

type ProductDetailProps = {};
const ProductDetail = ({}: ProductDetailProps) => {
  const { category, price, description, options, image, id, title } =
    useLocation().state.product;

  return (
    <div className="p-4">
      <p className="mb-2">{category}</p>
      <div className="flex gap-5">
        <img className="basis-1/2" src={image} alt="clothes" />
        <div className=" basis-1/2 font-light">
          <p className="font-semibold">{title}</p>
          <p className="font-semibold">{`₩${price}`}</p>
          <div className="border-b border-b-gray-300 my-1"></div>
          <p className="my-3">{description}</p>
          <div className="my-2 ">
            <div className="flex after:content-['⬇️'] after:transform after:-translate-x-6">
              <label className=" text-red-400" htmlFor="options">
                Options:
              </label>
              <select
                className="w-5/6 border border-red-400 border-dashed outline-none px-1 appearance-none"
                id="options"
              >
                {options.map((option: string) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <Button text="Add to Cart" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
