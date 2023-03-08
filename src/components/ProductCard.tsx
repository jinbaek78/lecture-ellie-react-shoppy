import { ReactNode } from 'react';
import { ProductType } from '../pages/NewProduct';

type ProductCardProps = {
  product: ProductType;
};
const ProductCard = ({
  product: { id, image, title, category, price },
}: ProductCardProps) => {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{` ₩${price}`}</p>
      </div>
    </li>
  );
};

export default ProductCard;
