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
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Orders from './components/Orders.jsx';
import NotFound from './components/NotFound.jsx';
import AdminLogin from "./pages/Admin/Login.jsx";
import Dashboard from './components/Admin/Dashboard.jsx';
import ProductList from './components/Admin/Products/List.jsx';
import AddEdit from "./components/Admin/Products/AddEdit.jsx";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/login" element={<Login />} />
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
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<AddEdit />} />
            <Route path="products/edit/:id" element={<AddEdit />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;