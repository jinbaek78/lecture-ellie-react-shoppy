import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import Products from './pages/Products';
import Carts from './pages/Carts';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Products /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:productId', element: <ProductDetail /> },
      { path: '/carts', element: <Carts /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
