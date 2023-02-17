import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserProvider from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Outlet />
    </UserProvider>
  );
}

export default App;
