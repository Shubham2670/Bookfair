import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../contexts/Cart-Context";
import { useAuth } from "../contexts/AuthContext";
import { quotes } from "../pages/utils/utils";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Footer } from "../common-components";
import { Sidebar } from "./Sidebar";

const Header: React.FC = () => {
  const location = useLocation();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const hide = ["/login", "/register-seller", "/register-buyer"].includes(
    location.pathname
  );
  const showBackToHome = [
    "/login",
    "/register-seller",
    "/register-buyer",
  ].includes(location.pathname);

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const roleBasedText =
    user?.role === "seller" ? "Become a Buyer" : "Become a Seller";

  const roleBasedLink =
    user?.role === "seller" ? "/register-buyer" : "/register-seller";

  const RoleBasedIcon =
    user?.role === "seller" ? ShoppingCartIcon : StorefrontIcon;
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  return (
    <>
      <header className="bg-customIndigo text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
            <Link to="/">
              <span className="text-indigo-300">Book</span>fair
            </Link>
          </div>

          {!hide && (
            <div
              className={`hidden md:block text-sm italic ${randomQuote.color}`}
            >
              ✨ "{randomQuote.text}" — {randomQuote.author}
            </div>
          )}

          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-lg text-white font-medium flex items-center gap-2"
            >
              <HomeIcon />
              <span>Home</span>
            </Link>
            <Link
              to={roleBasedLink}
              className="text-lg text-white font-medium flex items-center gap-2"
            >
              <RoleBasedIcon />
              <span>{roleBasedText}</span>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 hover:text-indigo-300 transition"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <AccountCircleIcon />
                  <span>{user.name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                    >
                      Your Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 hover:text-indigo-300 transition"
              >
                <AccountCircleIcon />
                <span>Log In</span>
              </Link>
            )}

            {/* Cart Icon */}
            {user?.role?.toLowerCase() === "buyer" && (
              <Link to="/cart-item" className="relative">
                <ShoppingCartIcon />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </header>
    </>
  );
};

export default Header;
