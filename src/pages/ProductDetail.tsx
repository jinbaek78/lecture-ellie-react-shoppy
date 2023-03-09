import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

type ProductDetailProps = {};
const ProductDetail = ({}: ProductDetailProps) => {
  const { category, price, description, options, image, id, title } =
    useLocation().state.product;

  return (
    <>
      <p>{category}</p>
      <div>
        <img src={image} alt="clothes" />
        <div>
          <p>{title}</p>
          <p>{`₩${price}`}</p>
          <p>{description}</p>
          <div>
            <label htmlFor="options">Options</label>
            <select id="options">
              {options.map((option: string) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>
          <Button text="Add to Cart" />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
