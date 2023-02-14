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
    <header>
      <div onClick={handleShoppyClick}>
        <FiShoppingBag />
        <p>Shoppy</p>
      </div>
      <div>
        <p onClick={handleProductsClick}>Products</p>
        <p onClick={handleCartsClick}>Carts</p>
        <BsPencilFill onClick={handlePencilClick} />
        <p>Login</p>
      </div>
    </header>
  );
};

export default Header;
