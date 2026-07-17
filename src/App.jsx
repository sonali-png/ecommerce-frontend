import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute.jsx";

import "./App.css";

// -----------------------
// Lazy Loaded Pages
// -----------------------
const Layout = lazy(() => import("./components/Layout.jsx"));
const AccountLayout = lazy(() => import("./components/AccountLayout.jsx"));
const AdminLayout = lazy(() => import("./components/Admin/AdminLayout.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));

const Profile = lazy(() => import("./components/Profile.jsx"));
const Orders = lazy(() => import("./components/Orders.jsx"));

const ProductListing = lazy(() =>
  import("./components/ProductListing.jsx")
);

const ProductDetail = lazy(() =>
  import("./components/ProductDetail.jsx")
);

const NotFound = lazy(() =>
  import("./components/NotFound.jsx")
);

// Admin
const AdminLogin = lazy(() =>
  import("./pages/Admin/Login.jsx")
);

const Dashboard = lazy(() =>
  import("./pages/Admin/Dashboard.jsx")
);

const ProductsList = lazy(() =>
  import("./pages/Admin/Products/List.jsx")
);

const ProductAddEdit = lazy(() =>
  import("./pages/Admin/Products/AddEdit.jsx")
);

const CategoriesList = lazy(() =>
  import("./pages/Admin/Categories/List.jsx")
);

const CategoryAddEdit = lazy(() =>
  import("./pages/Admin/Categories/AddEdit.jsx")
);

const AttributesList = lazy(() =>
  import("./pages/Admin/Attributes/List.jsx")
);

const AttributeAddEdit = lazy(() =>
  import("./pages/Admin/Attributes/AddEdit.jsx")
);

const UsersList = lazy(() =>
  import("./pages/Admin/Users/List.jsx")
);


function Loader() {
  return (
    <div className="page-loader">
      Loading...
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* Public */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            {/* <Route path="/search" element={<ProductListing />} /> */}
            <Route
              path="/product/:productSlug/:productCode"
              element={<ProductDetail />}
            />
            {/* <Route path="/login" element={<Login />} /> */}
          </Route>

          {/* Wishlist */}
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


          {/* Admin */}
          <Route
            path="/admin"
            element={<AdminProtectedRoute />}
          >
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="products">
                <Route index element={<ProductsList />} />
                <Route path="add" element={<ProductAddEdit />} />
                <Route path="edit/:id" element={<ProductAddEdit />} />
              </Route>

              <Route path="categories">
                <Route index element={<CategoriesList />} />
                <Route path="add" element={<CategoryAddEdit />} />
                <Route path="edit/:id" element={<CategoryAddEdit />} />
              </Route>

              <Route path="attributes">
                <Route index element={<AttributesList />} />
                <Route path="add" element={<AttributeAddEdit />} />
                <Route path="edit/:id" element={<AttributeAddEdit />} />
              </Route>

              <Route path="users">
                <Route index element={<UsersList />} />
              </Route>

            </Route>
          </Route>
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;