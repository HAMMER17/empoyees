import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import { Auth } from './auth/auth';
import Employees from './pages/Employee';
import AddEmployee from './pages/AddEmployee';
import User from './pages/User';
import Edit from './pages/Edit';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/employee',
    element: <Employees />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/employees/add',
    element: <AddEmployee />
  },
  {
    path: '/employees/:id',
    element: <User />
  },
  {
    path: '/employees/edit/:id',
    element: <Edit />
  }
])
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </Provider>
  </React.StrictMode>
);


