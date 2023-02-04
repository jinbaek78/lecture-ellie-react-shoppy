import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import UserProvider from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Header />
      <Outlet />
    </UserProvider>
  );
};

export default App;
