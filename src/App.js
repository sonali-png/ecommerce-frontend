//https://www.radiustheme.com/demo/wordpress/themes/metro/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import AccountLayout from "./components/AccountLayout.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute.js";

import Login from './pages/Login.jsx';
import Profile from './components/Profile.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Orders from './components/Orders.jsx';
import NotFound from './components/NotFound.jsx';
import AdminLogin from './pages/Admin/Login.jsx';
import Dashboard from './components/Admin/Dashboard.jsx';
import ProductList from './components/Admin/Products/List.jsx';
import ProductAddEdit from './components/Admin/Products/AddEdit.jsx';
import CategoryList from './components/Admin/Category/List.jsx';
import CategoryAddEdit from './components/Admin/Category/AddEdit.jsx';
import AttributeList from './components/Admin/Attributes/List.jsx';
import AttributeAddEdit from './components/Admin/Attributes/AddEdit.jsx';
import ProductListing from './components/ProductListing.jsx';
import ProductDetail from './components/ProductDetail.jsx';

import "./App.css"; 
function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route element={<Layout />}>
          {/* <Route path="/search" element={<ProductListing />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productSlug/:productCode" element={<ProductDetail />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>
        
        <Route path="/wishlist" element={<AccountLayout />}>
          <Route index element={<Wishlist />} />
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Profile />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products"> 
              <Route index element={<ProductList />} />
              <Route path="add" element={<ProductAddEdit />} />
              <Route path="edit/:id" element={<ProductAddEdit />} />
            </Route>
            <Route path="categories"> 
              <Route index element={<CategoryList />} />
              <Route path="add" element={<CategoryAddEdit />} />
              <Route path="edit/:id" element={<CategoryAddEdit />} />
            </Route>
            <Route path="attributes"> 
              <Route index element={<AttributeList />} />
              <Route path="add" element={<AttributeAddEdit />} />
              <Route path="edit/:id" element={<AttributeAddEdit />} />
            </Route>
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;