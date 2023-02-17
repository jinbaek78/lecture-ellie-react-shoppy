import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

type NewProductProps = {};
const NewProduct = ({}: NewProductProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useUser();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, []);
  return <div>New Product</div>;
};

export default NewProduct;
