import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IDataBase } from '../db/DataBase';
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

type ProductContextType = {
  products: ProductType[] | null;
  addProduct: (productInfo: ProductType, callback: () => void) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

type ProductsProviderProps = {
  children: ReactNode;
};
const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const { db } = useDB();
  const handleAddProduct = (productInfo: ProductType, callback: () => void) =>
    db.updateProduct(productInfo, callback);
  useEffect(() => {
    const unSubscribeProducts = db.subscribeProducts(setProducts);
    return () => unSubscribeProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ products, addProduct: handleAddProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const productsContext = useContext(ProductContext);
  if (productsContext) {
    return productsContext;
  }
  throw Error('something went wrong');
};

export default ProductsProvider;
