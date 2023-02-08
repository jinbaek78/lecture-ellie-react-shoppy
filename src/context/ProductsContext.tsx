import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IDataBase } from '../db/DataBase';

export type ProductType = {
  imgURL?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  options: string;
  id: string;
};

export type rawProductType = {
  [key: string]: ProductType;
};

type ProductContextType = {
  products: ProductType[] | null;
  addProduct: (productInfo: ProductType, callback: () => void) => void;
  getProductInfo: (id: string) => ProductType | undefined;
};

const ProductContext = createContext<ProductContextType | null>(null);

type ProductsProviderProps = {
  db: IDataBase;
  children: ReactNode;
};
const ProductsProvider = ({ db, children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [rawProducts, setRawProducts] = useState<rawProductType | null>(null);
  const handleAddProduct = (productInfo: ProductType, callback: () => void) =>
    db.updateProduct(productInfo, callback);
  const getProductInfo = (id: string) => rawProducts?.[id];
  useEffect(() => {
    const unSubscribeProducts = db.subscribeProducts(
      setProducts,
      setRawProducts
    );
    return () => unSubscribeProducts();
  }, []);
  return (
    <ProductContext.Provider
      value={{ products, addProduct: handleAddProduct, getProductInfo }}
    >
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
