import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Layout from './pages/Layout.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import "./App.css"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;