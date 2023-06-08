import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/footer/Footer";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import Secret from "./pages/Secret";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";

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
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Menu />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="secret" element={<Secret />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
