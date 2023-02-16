import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Storage from './db/storage';
import './index.css';
import AllProducts from './pages/AllProducts';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import NewProduct from './pages/NewProduct';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Auth from './services/auth';

const authService = new Auth();
const storage = new Storage();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App authService={authService} storage={storage} />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <AllProducts />,
      },
      {
        path: '/products/new',
        element: <NewProduct />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/carts',
        element: <MyCart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
