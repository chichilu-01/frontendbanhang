// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// USER PAGES
import Home from "@pages/Home";
import ProductsPage from "@pages/ProductsPage";
import ProductDetail from "@pages/ProductDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import VerifyCode from "@pages/VerifyCode";
import VerifyResetCode from "@pages/VerifyResetCode";
import ForgotPassword from "@pages/ForgotPassword";
import ResetPassword from "@pages/ResetPassword";
import CartPage from "@pages/CartPage";
import AccountPage from "@pages/AccountPage";

// ADMIN PAGES
import AdminPage from "@pages/AdminPage";
import AdminAddProductPage from "@pages/AdminAddProductPage";
import ProductMediaManager from "@features/admin/ProductMediaManager";

// COMPONENTS
import Navbar from "@components/Navbar";
import ProtectedRoute from "@components/ProtectedRoute";
import AdminRoute from "@components/AdminRoute";
import MobileLayout from "@layouts/MobileLayout";
import Footer from "@components/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ================= AUTH PAGES (Không dùng layout, không navbar) ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-code" element={<VerifyResetCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= USER + ADMIN PAGES (có navbar + mobile layout) ================= */}
        <Route
          element={
            <>
              <Navbar /> {/* navbar chỉ desktop */}
              <MobileLayout /> {/* bottom tab chỉ mobile */}
              <Footer /> {/* footer toàn site */}
            </>
          }
        >
          {/* HOME */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          {/* ACCOUNT */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
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
        </Route>
      </Routes>
    </Router>
  );
}
