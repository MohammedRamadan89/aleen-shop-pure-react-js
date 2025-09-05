// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// صفحات عامة
import HomePage from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
// المنتجات
import ProductDetails from "../features/products/pages/ProductDetails";
import CategoryPageWrapper from "../features/products/pages/CategoryPageWrapper";
import CategoryPage from "../features/products/pages/CategoryPage";

// الحساب والمصادقة
import LogIn from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import ProfilePage from "../features/auth/pages/ProfilePage";

// المفضلة
import FavoritesPage from "../features/favorites/pages/FavoritesPage";

// السلة
import CartPage from "../features/cart/pages/CartPage";

// الطلبات
import CheckoutPage from "../features/orders/pages/CheckoutPage";
import OrderConfirmation from "../features/orders/pages/OrderConfirmation";
import OrdersPage from "../features/orders/pages/OrdersPage";
import OrderDetails from "../features/orders/pages/OrderDetails";

// الإشعارات
import NotificationsPage from "../features/notifications/pages/NotificationsPage";

// حماية المسارات
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
      <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
      
      {/* حساب المستخدم */}
      <Route path="/signin" element={<LogIn />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* مسارات محمية (تحتاج تسجيل دخول) */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout><ProfilePage /></MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/favorites" element={
        <ProtectedRoute>
          <MainLayout><FavoritesPage /></MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/notifications" element={
        <ProtectedRoute>
          <MainLayout><NotificationsPage /></MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/orders" element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      } />

      <Route path="/orders/:orderId" element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      } />

      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />

      <Route path="/order-confirmation" element={
        <ProtectedRoute>
          <OrderConfirmation />
        </ProtectedRoute>
      } />

      {/* منتجات */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:productId" element={<MainLayout><ProductDetails /></MainLayout>} />
      <Route path="/category/:mainCategory/:subCategory" element={<MainLayout><CategoryPageWrapper mainCategory subCategory /></MainLayout>} />
      <Route path="/products/:category" element={<MainLayout><CategoryPageWrapper /></MainLayout>} />
      <Route path="/products/" element={<MainLayout><CategoryPage category={"allProducts"} /></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;
