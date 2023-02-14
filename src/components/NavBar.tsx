import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
type NavBarProps = {};
const NavBar = ({}: NavBarProps) => {
  return (
    <header>
      <Link to="/">
        <FiShoppingBag />
        <h1>Soppy</h1>
      </Link>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new">
          <BsFillPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
};

export default NavBar;
