import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import DbProvider from './context/DbContext';
import ProductsProvider from './context/ProductsContext';
import UserProvider from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Header />
      <DbProvider>
        <ProductsProvider>
          <Outlet />
        </ProductsProvider>
      </DbProvider>
    </UserProvider>
  );
};

export default App;
