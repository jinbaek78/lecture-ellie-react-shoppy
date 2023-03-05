import { ReactNode, useEffect, useState } from 'react';
import { subscribeProducts } from '../api/firebase';
import Products from '../components/Products';
import { ProductType } from './NewProduct';

type AllProductsProps = {};
const AllProducts = ({}: AllProductsProps) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  useEffect(() => {
    const unSubscribeProducts = subscribeProducts(setProducts);

    return () => unSubscribeProducts();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-2 gap-y-3 mt-2">
      {products &&
        products.map((product) => (
          <Products product={product} key={product.id} />
        ))}
    </div>
  );
};

export default AllProducts;
