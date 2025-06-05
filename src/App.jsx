import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import ProductDetail from "@pages/ProductDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import VerifyCode from "@pages/VerifyCode";
import ForgotPassword from "@pages/ForgotPassword";
import VerifyResetCode from "@pages/VerifyResetCode";
import ResetPassword from "@pages/ResetPassword";
import Cart from "@pages/Cart";
import AdminPage from "@pages/AdminPage";
import Navbar from "@components/Navbar";
import ProtectedRoute from "@components/ProtectedRoute";
import AdminRoute from "@components/AdminRoute";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-code" element={<VerifyResetCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
