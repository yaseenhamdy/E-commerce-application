import React, { useEffect } from 'react'
import GallerySlider from './Component/Brand/Brand'
import CategoriesSlider from './Component/CategoriesSlider/CategoriesSlider'
import Products from './Component/Products/Products'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Home from './Component/Home/Home.jsx'
import Layout from './Component/Layout/Layout'
import NotFound from './Component/NoFound/NotFound.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import { useContext } from 'react'
import UserContextProvider, { UserContext } from './Context/UserContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import Cart from './Component/Cart/Cart'
import { CartContext } from './CartContext/CartContext'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import ResetPasswordCode from './Component/ResetPasswordCode/ResetPasswordCode'
import ResetNewPassword from './Component/ResetNewPassword/ResetNewPassword'
import PayOnlineForm from './Component/PayOnlineForm/PayOnlineForm'
import AllOrders from './Component/AllOrders/AllOrders'
import Profile from './Component/Profile/Profile'
import Brand from './Component/Brand/Brand'
import SubBrand from './Component/Brand/SubBrand'
import Categories from './Component/Categories/Categories'
import SubCategory from './Component/SubCategory/SubCategory'
import WishList from './Component/WishList/WishList'
import { Link, useNavigate } from 'react-router-dom'




export default function App() {

  // let route = createBrowserRouter(
  //   [
  //     {
  //       path: '/', element: <Layout />, children: [
  //         { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
  //         { path: 'home', element: <ProtectedRoute><Home /> </ProtectedRoute> },
  //         { path: 'categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
  //         { path: 'subCategory/:id', element: <ProtectedRoute><SubCategory /> </ProtectedRoute> },
  //         { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute> },
  //         { path: 'brand', element: <ProtectedRoute> <Brand /> </ProtectedRoute> },
  //         { path: 'subBrand/:id', element: <ProtectedRoute> <SubBrand /> </ProtectedRoute> },
  //         { path: 'cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
  //         { path: 'wishList', element: <ProtectedRoute> <WishList /></ProtectedRoute> },
  //         { path: 'payOnlineForm', element: <ProtectedRoute><PayOnlineForm /></ProtectedRoute> },
  //         { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
  //         { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
  //         { path: 'register', element: <Register /> },
  //         { path: 'login', element: <Login /> },
  //         { path: 'forgetPassword', element: <ForgetPassword /> },
  //         { path: 'recetPassword', element: <ResetPasswordCode /> },
  //         { path: '/resetNewpassword', element: <ResetNewPassword /> },
  //         { path: 'details/:id', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
  //         { path: '*', element: <NotFound /> },
  //       ]
  //     }
  //   ]
  // )

  let { setUserToken, userToken } = useContext(UserContext);
  let { increase, numberInCart, setNumberInCart } = useContext(CartContext)

  useEffect(() => {
    if (localStorage.getItem('userToken') !== '') {
      setUserToken(localStorage.getItem('userToken'));
      setNumberInCart(localStorage.getItem('inCart'))
    }
  })

 

  let route = createBrowserRouter(
    [
      {
        path: '/', element: <Layout />, children: [
          { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
          { path: 'home', element: <ProtectedRoute><Home /> </ProtectedRoute> },
          { path: 'categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
          { path: 'subCategory/:id', element: <ProtectedRoute><SubCategory /> </ProtectedRoute> },
          { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute> },
          { path: 'brand', element: <ProtectedRoute> <Brand /> </ProtectedRoute> },
          { path: 'subBrand/:id', element: <ProtectedRoute> <SubBrand /> </ProtectedRoute> },
          { path: 'cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
          { path: 'wishList', element: <ProtectedRoute> <WishList /></ProtectedRoute> },
          { path: 'payOnlineForm', element: <ProtectedRoute><PayOnlineForm /></ProtectedRoute> },
          { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
          { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
          { path: 'register', element: <Register /> },
          { path: 'login', element: <Login /> },
          { path: 'forgetPassword', element: <ForgetPassword /> },
          { path: 'recetPassword', element: <ResetPasswordCode /> },
          { path: '/resetNewpassword', element: <ResetNewPassword /> },
          { path: 'details/:id', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
          { path: '*', element:<ProtectedRoute> <NotFound /> </ProtectedRoute>},
        ]
      }
    ]
  );




  return (
    <div>
      <RouterProvider router={route} />
      <ToastContainer
        autoClose={2000}
        theme="colored"
      />
    </div>

  )
}















