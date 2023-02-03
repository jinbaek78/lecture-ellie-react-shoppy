import { ReactNode } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
type HeaderProps = {};
const Header = ({}: HeaderProps) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  const handleProductClick = () => {
    navigate('/products');
  };
  const handleCartClick = () => {
    navigate('/carts');
  };
  const handleLoginClick = () => {
    //callback();
  };
  return (
    <div className="flex justify-between p-2">
      <div
        className="flex items-center cursor-pointer text-[#4abad9]"
        onClick={handleLogoClick}
      >
        <FiShoppingBag size={20} />
        <p className="ml-1">Shoppy</p>
      </div>
      <div className=" flex items-center  mr-8">
        <p className="mr-5 cursor-pointer" onClick={handleProductClick}>
          Products
        </p>
        <AiOutlineShoppingCart
          className="mr-6 text-xl  font-semibold cursor-pointer"
          onClick={handleCartClick}
        />
        <button className="text-white bg-[#4abad9] " onClick={handleLoginClick}>
          <p className="p-1 px-3 text-sm text-white font-bold">Login</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
