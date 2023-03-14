import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';

type NavBarProps = {};
const NavBar = ({}: NavBarProps) => {
  const { user, login, logout } = useAuthContext();
  const { cartCount } = useCartContext();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Soppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/carts">
            <div className=" relative">
              <AiOutlineShoppingCart size={32} />
              {cartCount && (
                <div className="absolute -top-2 left-4 w-6 h-6 bg-brand rounded-full text-center">
                  {<span className="text-white">{cartCount}</span>}
                </div>
              )}
            </div>
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'login'} onClick={login} />}
        {user && <Button text={'logout'} onClick={logout} />}
      </nav>
    </header>
  );
};

export default NavBar;
