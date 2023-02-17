import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

type MyCartProps = {};
const MyCart = ({}: MyCartProps) => {
  const navigate = useNavigate();
  const { isAdmin, user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);
  return <div>My Cart</div>;
};

export default MyCart;
