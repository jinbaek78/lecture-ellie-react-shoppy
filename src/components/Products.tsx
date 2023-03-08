import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { getProducts } from '../api/firebase';
import { ProductType } from '../pages/NewProduct';
import ProductCard from './ProductCard';

type ProductsProps = {};
const Products = ({}: ProductsProps) => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<Promise<unknown[]>, string, ProductType[] | null>(
    ['products'],
    getProducts
  );
  console.log('products: ', products);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
};

export default Products;
