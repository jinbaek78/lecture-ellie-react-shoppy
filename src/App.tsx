import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserProvider from './contexts/UserContext';
import { IStorage } from './db/storage';
import { IAuth } from './services/auth';

type AppProps = {
  authService: IAuth;
  storage: IStorage;
};

function App({ authService, storage }: AppProps) {
  return (
    <>
      <UserProvider authService={authService} storage={storage}>
        <NavBar />
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
