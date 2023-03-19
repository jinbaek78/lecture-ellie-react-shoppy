import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import {
  getDatabase,
  get,
  ref,
  set,
  DataSnapshot,
  remove,
} from 'firebase/database';
import { ProductType } from '../pages/NewProduct';
import { CartProduct } from '../pages/MyCart';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
const auth = getAuth();
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(
  callback: (user: (User & { isAdmin: boolean }) | null) => void
) {
  return onAuthStateChanged(auth, async (user: User | null) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user: User) {
  return get(ref(db, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin: boolean = admins.includes(user?.uid);
        return { ...user, isAdmin };
      }
      return { ...user, isAdmin: false };
    });
}

export async function addNewProduct(product: ProductType, image: string) {
  const id = uuid();
  return set(ref(db, `products/${id}`), {
    ...product,
    id,
    image,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  return get(ref(db, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId: string | null) {
  if (!userId) {
    return [];
  }

  return get(ref(db, `carts/${userId}`)) //
    .then((snapshot: DataSnapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId: string, product: CartProduct) {
  console.log('god product:', product);
  return set(ref(db, `carts/${userId}/${product.id}`), product);
}

export async function removerFromCart(userId: string, productId: string) {
  return remove(ref(db, `carts/${userId}/${productId}`));
}
