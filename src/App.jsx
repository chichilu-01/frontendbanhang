import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminPanel from "./pages/AdminPanel";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import UploadMedia from "./pages/UploadMedia";
import UploadWithInput from "./pages/UploadWithInput";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import OAuthRedirectHandler from "./pages/OAuthRedirectHandler";
import CloudinaryUpload from "./pages/CloudinaryUpload";
import UniverseSection from "./pages/UniverseSection";
import UniverseProvider from "./context/UniverseToggleContext";
import UniverseEffects from "./components/UniverseEffects";
import PortalEffect from "./components/PortalEffect"; // 👈 import

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <UniverseProvider>
          <UniverseEffects /> {/* 👈 hiệu ứng galaxy toàn trang */}
          <Router>
            <Header />
            <PortalEffect /> {/* 👈 hiệu ứng mở cổng */}
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route
                path="/oauth/callback"
                element={<OAuthRedirectHandler />}
              />
              <Route path="/cloudinary-upload" element={<CloudinaryUpload />} />
              <Route path="/upload-media" element={<UploadMedia />} />
              <Route path="/upload-input" element={<UploadWithInput />} />
              <Route path="/universe" element={<UniverseSection />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute role="admin">
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/add"
                element={
                  <PrivateRoute role="admin">
                    <AddProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/edit/:id"
                element={
                  <PrivateRoute role="admin">
                    <EditProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <PrivateRoute>
                    <MyOrders />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </UniverseProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
