import { ReactNode } from 'react';
import AllProducts from './AllProducts';

type HomeProps = {};
const Home = ({}: HomeProps) => {
  return (
    <>
      <div className="flex justify-center items-center w-full   h-72 bg-banner bg-cover bg-center">
        <span className="text-white">
          <h1 className=" text-5xl">Shop With Us</h1>
          <h3 className="text-center font-light my-2">
            Best Products, High Quality
          </h3>
        </span>
      </div>
      <AllProducts />
    </>
  );
};

export default Home;
