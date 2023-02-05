import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDB } from './DbContext';

export type ProductType = {
  imgURL?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  options: string;
  id: string;
};

const ProductContext = createContext<ProductType[] | null>(null);

type ProductsProviderProps = {
  children: ReactNode;
};
const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const db = useDB();
  useEffect(() => {
    const unSubscribeProducts = db.subscribeProducts(setProducts);
    return () => unSubscribeProducts();
  }, []);
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductType[] | null => {
  return useContext(ProductContext);
};

export default ProductsProvider;
