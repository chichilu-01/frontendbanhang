// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import ProductDetail from "@pages/ProductDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import VerifyCode from "@pages/VerifyCode";
import VerifyResetCode from "@pages/VerifyResetCode";
import ForgotPassword from "@pages/ForgotPassword";
import ResetPassword from "@pages/ResetPassword";
import CartPage from "@pages/CartPage";
import AdminPage from "@pages/AdminPage";
import ProductMediaManager from "@features/admin/ProductMediaManager";
import Navbar from "@components/Navbar";
import ProtectedRoute from "@components/ProtectedRoute";
import AdminRoute from "@components/AdminRoute";
import AdminAddProductPage from "@pages/AdminAddProductPage";
import MobileLayout from "@layouts/MobileLayout";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        {/* --- 📱 MOBILE BOTTOM TAB LAYOUT --- */}
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* --- 🔐 AUTH PAGES (không có bottom tab) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-code" element={<VerifyResetCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* --- 🛠️ ADMIN ROUTES (không có bottom tab) --- */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AdminAddProductPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/product/:id/media"
          element={
            <AdminRoute>
              <ProductMediaManager />
            </AdminRoute>
          }
        />

      </Routes>
    </Router>
  );
}
