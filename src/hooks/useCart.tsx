import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removerFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { CartProduct } from '../pages/MyCart';

const useCart = () => {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery<Promise<unknown[]>, string, CartProduct[]>(
    ['carts', uid || ''],
    () => getCart(uid),
    { enabled: !!uid }
  );

  const addOrUpdateItem = useMutation(
    (product: CartProduct) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['carts', uid]);
      },
    }
  );

  const removeItem = useMutation((id: string) => removerFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
};

export default useCart;
