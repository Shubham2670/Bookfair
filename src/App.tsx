import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
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

              {/* Protected Routes */}
              <Route path="/profile" element={<Profile />} />
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
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
