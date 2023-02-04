import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import DbProvider from './context/DbContext';
import UserProvider from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <DbProvider>
        <Header />
        <Outlet />
      </DbProvider>
    </UserProvider>
  );
};

export default App;
