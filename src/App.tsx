import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import SellerModule from "./pages/Sellermodule";
import Header from "./components/Header";
import RegisterBuyer from "./pages/buyer-registration page/BuyerRegister";
import SellerRegister from "./pages/seller-registeration page/SellerRegister";
import { BuyerPage } from "./pages/buyer-landing page/buyerpage";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/Cart-Context";
import CartPage from "./pages/buyer-landing page/add-Cart page";
import SellerDashboard from "./pages/seller-landing page/seller-page";
import ProtectedRoute from "./contexts/PrivateRoute";
import { Roles } from "./types";
import LoginPage from "./pages/login-page/loginpage";
import Profile from "./pages/profile-page/profile";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className="container  mx-auto  w-full">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register-buyer" element={<RegisterBuyer />} />
              <Route path="/register-seller" element={<SellerRegister />} />
              <Route path="/profile" element={<Profile />} />
              {/* Protected Routes */}
              <Route
                path="/seller"
                element={
                  <ProtectedRoute allowedRoles={[Roles.SELLER]}>
                    <SellerModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buyer-dashboard"
                element={
                  <ProtectedRoute allowedRoles={[Roles.BUYER]}>
                    <BuyerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller-Dashboard"
                element={
                  <ProtectedRoute allowedRoles={[Roles.SELLER]}>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart-item"
                element={
                  <ProtectedRoute allowedRoles={[Roles.BUYER]}>
                    <CartPage
                      id={0}
                      name={""}
                      price={0}
                      quantity={0}
                      image={""}
                    />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <div className="fixed  bottom-0 w-full h-[120px]">
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
