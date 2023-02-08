import {
  db,
  ref,
  set,
  onValue,
  child,
  push,
  update,
  remove,
  Unsubscribe,
} from '../config/firebase';
import { RawCartItemType } from '../context/CartContext';
import { ProductType, rawProductType } from '../context/ProductsContext';
import { CartType } from '../pages/ProductDetail';

export interface IDataBase {
  updateProduct: (data: ProductType, callback: () => void) => Promise<void>;
  updateCart: (data: CartType, uid: string) => Promise<void>;
  subscribeProducts: (
    updateProducts: (products: ProductType[] | null) => void,
    updateRawProducts: (rawProducts: rawProductType | null) => void
  ) => Unsubscribe;
  subscribeCart: (uid: string, callback: any) => Unsubscribe;
}

export default class DataBase implements IDataBase {
  constructor() {}

  subscribeProducts(
    updateProducts: (products: ProductType[] | null) => void,
    updateRawProducts: (rawProducts: rawProductType | null) => void
  ): Unsubscribe {
    const productsRef = ref(db, 'products');
    return onValue(productsRef, (snapshot) => {
      const rawData: rawProductType | null = snapshot.val();
      const result: ProductType[] = [];
      if (rawData) {
        const products: ProductType[] = Object?.values?.(rawData);
        for (const product of products) {
          result.push(product);
        }
        console.log('products updated', products);
        console.log('product raw rawData', rawData);
        updateProducts(result);
        updateRawProducts(rawData);
      }
    });
  }

  async updateProduct(data: ProductType, callback: () => void) {
    const productsRef = ref(db, 'products');
    const key = push(productsRef).key;
    return update(ref(db, `products/${key}`), { ...data, id: key }) //
      .then(() => {
        callback();
        return console.log('products have updated successfuly');
      })
      .catch((err) => console.log('err: ', err));
  }

  // return update(ref(db, `users/${uid}/cart/${data.id}`), data)

  subscribeCart(
    uid: string,
    callback: (cart: CartType[]) => void
  ): Unsubscribe {
    const cartRef = ref(db, `users/${uid}/cart`);
    return onValue(cartRef, (snapshot) => {
      const data: RawCartItemType | null = snapshot.val();
      const result: CartType[] = [];
      console.log('data: ', data);
      if (data) {
        const cart: CartType[] | undefined = Object.values(data);
        for (const product of cart) {
          result.push(product);
        }
        console.log('cart updated', cart);
        callback(result);
      }
    });
  }

  async updateCart(data: CartType, uid: string) {
    return update(ref(db, `users/${uid}/cart/${data.id}`), data)
      .then(() => {
        return console.log('cart has updated successfully');
      })
      .catch((err) => console.log('err: ', err));
  }

  // async subscribeOnProductChange => using onValue
  // async subscribeOnCartChange => using onValue

  // remove(ref(db, 'somethingNew/-NNQUUxY_WSUXJYc_NFS'));
  // async remove(){}
}
