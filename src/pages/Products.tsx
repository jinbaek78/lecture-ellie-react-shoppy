import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/Banner';
import Product from '../components/Product';
import { useProducts } from '../context/ProductsContext';

type ProductsProps = {};
const Products = ({}: ProductsProps) => {
  const hasBanner = useLocation().pathname === '/';
  const products = useProducts();
  console.log(products?.[0]);
  return (
    <>
      {hasBanner && <Banner />}
      <div className="grid grid-cols-4 gap-3">
        {products &&
          products.map((product) => {
            console.log(product.id);
            return <Product key={product.id} product={product} />;
          })}
      </div>
    </>
  );
};

export default Products;
