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
import { ProductType } from '../context/ProductsContext';
import { CartType } from '../pages/ProductDetail';

export interface IDataBase {
  updateProduct: (data: ProductType) => Promise<void>;
  updateCart: (data: CartType, uid: string) => Promise<void>;
  subscribeProducts: (callback: any) => Unsubscribe;
}

export default class DataBase implements IDataBase {
  constructor() {}

  subscribeProducts(callback: (products: ProductType[]) => void): Unsubscribe {
    const productsRef = ref(db, 'products');
    return onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const result: ProductType[] = [];
      const products: ProductType[] | undefined = Object.values(data);
      for (const product of products) {
        result.push(product);
      }
      console.log('products updated', products);
      callback(result);
    });
  }

  async updateProduct(data: ProductType) {
    const productsRef = ref(db, 'products');
    const key = push(productsRef).key;
    return update(ref(db, `products/${key}`), { ...data, id: key }) //
      .then(() => {
        return console.log('products have updated successfuly');
      })
      .catch((err) => console.log('err: ', err));
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
