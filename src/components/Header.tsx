import { ReactNode } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {};
const Header = ({}: HeaderProps) => {
  const navigate = useNavigate();
  const handleShoppyClick = () => navigate('/');
  const handleProductsClick = () => navigate('/products');
  const handleCartsClick = () => navigate('/carts');
  const handlePencilClick = () => navigate('/products/new');

  return (
    <header className="flex  justify-between p-1 px-2 border-b border-b-zic-300 cursor-pointer">
      <div
        className="flex gap-1 items-center text-2xl text-[#4abad9]"
        onClick={handleShoppyClick}
      >
        <FiShoppingBag />
        <p>Shoppy</p>
      </div>
      <div className="flex gap-2 items-center text-sm font-semibold cursor-pointer">
        <p onClick={handleProductsClick}>Products</p>
        <p onClick={handleCartsClick}>Carts</p>
        <BsPencilFill onClick={handlePencilClick} />
        <p>Login</p>
      </div>
    </header>
  );
};

export default Header;
