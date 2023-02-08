import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import CartProvider from './context/CartContext';
import ProductsProvider from './context/ProductsContext';
import UserProvider from './context/UserContext';
import { IDataBase } from './db/DataBase';

type AppProps = {
  db: IDataBase;
};
const App = ({ db }: AppProps) => {
  return (
    <UserProvider>
      <CartProvider db={db}>
        <Header />
        <ProductsProvider db={db}>
          <Outlet />
        </ProductsProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
