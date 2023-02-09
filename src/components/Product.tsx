import { useNavigate } from 'react-router-dom';
import { ProductType } from '../context/ProductsContext';

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const {
    imgURL,
    name,
    price,
    category,

    id: productId,
  } = product;
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/products/:${productId}`, { state: { product } });
  };
  return (
    <div className="flex flex-col" onClick={handleProductClick}>
      <img className="w-60 h-64" src={imgURL} />
      <div className="flex p-1 px-1 justify-between">
        <div className="flex flex-col ">
          <p className="text-sm">{name}</p>
          <p className="text-sm">{category}</p>
        </div>
        <p className="text-sm">₩{price}</p>
      </div>
    </div>
  );
};

export default Product;
