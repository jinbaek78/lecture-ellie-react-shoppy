import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import CartProvider from './context/CartContext';
import DbProvider from './context/DbContext';
import ProductsProvider from './context/ProductsContext';
import UserProvider from './context/UserContext';
import { IDataBase } from './db/DataBase';

type AppProps = {
  db: IDataBase;
};
const App = ({ db }: AppProps) => {
  return (
    <UserProvider>
      <DbProvider db={db}>
        <CartProvider>
          <Header />
          <ProductsProvider>
            <Outlet />
          </ProductsProvider>
        </CartProvider>
      </DbProvider>
    </UserProvider>
  );
};

export default App;
