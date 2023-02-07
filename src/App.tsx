import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
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
      <Header />
      <DbProvider db={db}>
        <ProductsProvider>
          <Outlet />
        </ProductsProvider>
      </DbProvider>
    </UserProvider>
  );
};

export default App;
