import {
  db,
  ref,
  set,
  onValue,
  child,
  push,
  update,
  remove,
} from '../config/firebase';
import { ProductType } from '../pages/Admin';

export interface IDataBase {
  updateProduct: (data: ProductType) => void;
  updateCart: (data: ProductType, uid: string) => void;
}

export default class DataBase implements IDataBase {
  constructor() {}

  async updateProduct(data: ProductType) {
    const productsRef = ref(db, 'products');
    const key = push(productsRef).key;
    // const newProductsRef = push(productsRef);
    // return set(newProductsRef, { ...data, id: key }) //
    return update(ref(db, `products/${key}`), { ...data, id: key }) //
      .then(() => {
        return console.log('products have updated successfuly');
      })
      .catch((err) => console.log('err: ', err));
  }

  async updateCart(data: ProductType, uid: string) {
    const product = {
      id: '-NNQeQuSHC6Ifh_Yal3j2',
      price: 160000,
      title: 'some1',
    };

    return update(ref(db, `users/${uid}/cart/${product.id}`), product)
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
