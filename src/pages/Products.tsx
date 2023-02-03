import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/Banner';
import Product from '../components/Product';

type ProductsProps = {};
const Products = ({}: ProductsProps) => {
  const hasBanner = useLocation().pathname === '/';
  return (
    <>
      {hasBanner && <Banner />}
      <div>
        {[1].map((item) => (
          <Product key={item} />
        ))}
      </div>
    </>
  );
};

export default Products;
