import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import OrderForm from "./components/order-form/OrderForm";
import AdminLogin from "./components/admin/auth/AdminLogin";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminOrders from "./components/admin/orders/AdminOrders";
import ProtectedRoute from "./components/admin/auth/ProtectedRoute";
import AdminSales from "./components/admin/AdminSales";
import AdminCategories from "./components/admin/catalog/AdminCategories";
import AdminProducts from "./components/admin/catalog/AdminProducts";
import AdminSettings from "./components/admin/AdminSettings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<OrderForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="sales" element={<AdminSales />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
