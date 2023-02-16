import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { useUser } from '../contexts/UserContext';

type NavBarProps = {};
const NavBar = () => {
  const { uid, displayName, photoURL, login, logout } = useUser();
  const handleLoginClick = () => {
    login();
  };
  const handleLogoutClick = () => {
    logout();
  };
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Soppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new" className="text-2xl">
          <BsFillPencilFill />
        </Link>
        {photoURL && (
          <div className="flex items-center gap-1.5">
            <img src={photoURL} className=" w-7 h-7 rounded-full" />
            <p>{displayName}</p>
          </div>
        )}

        {!uid && <button onClick={handleLoginClick}>Login</button>}
        {uid && <button onClick={handleLogoutClick}>Logout</button>}
      </nav>
    </header>
  );
};

export default NavBar;
