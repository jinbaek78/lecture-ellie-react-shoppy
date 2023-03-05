import { ProductType } from '../pages/NewProduct';

type ProductsProps = {
  product: ProductType;
};
const Products = ({ product }: ProductsProps) => {
  const { category, description, id, image, options, price, title } = product;
  return (
    <div className="w-full h-full rounded-lg shadow-lg">
      <img className="w-full rounded-t-lg" src={image} alt="image" />
      <div className="p-1 px-2">
        <div className="flex justify-between">
          <p className="text-sm">{title}</p>
          <p> ₩{price}</p>
        </div>
        <p className="text-xs -mt-1 text-gray-400">{category}</p>
      </div>
    </div>
  );
};

export default Products;
