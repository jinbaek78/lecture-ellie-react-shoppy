import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addOrUpdateToCart as addOrUpdateToCartDB,
  getCart,
  removerFromCart as removeFromCartDB,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { CartProduct } from '../pages/MyCart';

const useCarts = () => {
  const queryClient = useQueryClient();
  const { uid } = useAuthContext();
  const cartQuery = useQuery<Promise<unknown[]>, string, CartProduct[]>(
    [`${uid}/carts`],
    () => getCart(uid)
  );
  const addOrUpdateToCart = useMutation(
    (product: CartProduct) => addOrUpdateToCartDB(uid, product),
    { onSuccess: () => queryClient.invalidateQueries([`${uid}/carts`]) }
  );

  const removeFromCart = useMutation(
    (productId: string) => removeFromCartDB(uid, productId),
    { onSuccess: () => queryClient.invalidateQueries([`${uid}/carts`]) }
  );

  return { cartQuery, addOrUpdateToCart, removeFromCart };
};

export default useCarts;
