import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/footer/Footer";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import Secret from "./pages/Secret";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";

const PageNotFound = () => {
  return (
    <div className="container main-content d-flex justify-content-center align-items-center fs-1 fw-bold">
      404 | Page Not Found
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper min-vh-100">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/category/:slug" element={<CategoryView />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:slug" element={<ProductView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
            <Route path="secret" element={<Secret />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            <Route path="admin/product" element={<AdminProduct />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route
              path="admin/product/update/:slug"
              element={<AdminProductUpdate />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
