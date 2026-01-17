import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProductList from "./features/products/ProductList";
import ProductDetail from "./features/products/ProductDetail";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./features/admin/AdminLayout";
import ProductListAdmin from "./features/admin/ProductListAdmin";
import OrderListAdmin from "./features/admin/OrderListAdmin";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<ProductListAdmin />} />
            <Route path="orders" element={<OrderListAdmin />} />
          </Route>

          <Route path="*" element={<div className="container py-5 text-center"><h1>404 No Encontrado</h1></div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
