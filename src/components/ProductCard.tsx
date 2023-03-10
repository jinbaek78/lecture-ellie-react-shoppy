import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../pages/NewProduct';

type ProductCardProps = {
  product: ProductType;
};
const ProductCard = ({
  product,
  product: { id, image, title, category, price },
}: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg flex  justify-between items-center">
        <h3 className=" truncate">{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};

export default ProductCard;
