import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewProduct, getProducts } from '../api/firebase';
import { ProductType } from '../pages/NewProduct';

type AddProductVariables = {
  product: ProductType;
  url: string;
};

const useProducts = () => {
  const queryClient = useQueryClient();
  const productsQuery = useQuery<
    Promise<unknown[]>,
    string,
    ProductType[] | null
  >(['products'], getProducts, { staleTime: 1000 * 60 });

  const addProduct = useMutation(
    ({ product, url }: AddProductVariables) => addNewProduct(product, url),
    { onSuccess: () => queryClient.invalidateQueries(['products']) }
  );

  return { productsQuery, addProduct };
};

export default useProducts;
