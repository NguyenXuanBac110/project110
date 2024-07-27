import React from 'react';
import { useRoutes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminAdd from './pages/Admin/Product/Add';
import AdminEdit from './pages/Admin/Product/Edit';
import AdminList from './pages/Admin/Product/List';
import ClientLayout from './layouts/ClientLayout';
import Homepage from './pages/Client/HomePage';
import ProductDetail from './pages/Client/ProductDetail';
import Notfound from './pages/Client/Notfound';
import Register from './pages/Client/Register';
import Login from './pages/Client/Login';
import AdminAddCategory from './pages/Admin/Product/AdminAddCategory';
import { LoadingProvider } from './components/LoadingContext';
import { ErrorProvider } from './components/ErrorContext';
import Loading from './components/loading';
import ErrorNotification from './components/ErrorNotification';
import DynamicFieldArray from './pages/Admin/Product/fields';
import Cart from './pages/Client/Cart';
import { CartProvider } from './components/CartContext';
import Bill from './pages/Client/Bill';


const routeConfig = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'product/list', element: <AdminList /> },
      { path: 'product/add', element: <AdminAdd /> },
      { path: 'product/addCategory', element: <AdminAddCategory /> },
      { path: 'product/edit/:id', element: <AdminEdit /> },
      { path: 'product/Field', element: <DynamicFieldArray /> },
    ],
  },
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      { path: '', element: <Homepage /> },
      { path: '/not-found', element: <Notfound /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'cart', element: <Cart /> },
      { path: 'bill', element: <Bill /> },
    ],
  },
];

function App() {
  const routes = useRoutes(routeConfig);

  return (
    <LoadingProvider>
      <ErrorProvider>
        <CartProvider>
          <Loading />
          <ErrorNotification />
          <main>{routes}</main>
        </CartProvider>
      </ErrorProvider>
    </LoadingProvider>
  );
}

export default App;
