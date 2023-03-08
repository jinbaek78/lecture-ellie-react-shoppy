import { ReactNode } from 'react';
import Banner from '../components/Banner';
import Products from '../components/Products';

type HomeProps = {};
const Home = ({}: HomeProps) => {
  return (
    <>
      <Banner />
      <Products />
    </>
  );
};

export default Home;
