import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../contexts/Cart-Context";
import { useAuth } from "../contexts/AuthContext";
import { quotes } from "../pages/utils/utils";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  return (
    <header className="bg-indigo-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
          <Link to="/">
            <span className="text-indigo-300">Book</span>fair
          </Link>
        </div>

        {/* Quote (Hidden on login/register pages) */}
        {!hide && (
          <div
            className={`hidden md:block text-sm italic ${randomQuote.color}`}
          >
            ✨ "{randomQuote.text}" — {randomQuote.author}
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {/* Back to Homepage Button */}
          {/* <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </Button> */}

          <Link to={roleBasedLink} className="text-lg text-white font-medium">
            {roleBasedText}
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
          <Link to="/cart-item" className="relative">
            <ShoppingCartIcon />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-indigo-900 bg-opacity-95 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 flex flex-col space-y-4">
          <button
            className="self-end text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <CloseIcon />
          </button>

          {/* Back to Homepage Button in Mobile Menu */}

          {/* <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
          >
            Back to Homepage
          </Button> */}

          <Link
            to="/"
            className="text-lg text-white font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {userRole === "seller" ? (
            <Link
              to="/register-buyer"
              className="text-lg text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Become a Buyer
            </Link>
          ) : (
            <Link
              to="/register-seller"
              className="text-lg text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Become a Seller
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-lg text-white font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <button
                className="text-lg text-white font-medium text-left"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-lg text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log In
            </Link>
          )}

          {userRole === "buyer" && (
            <Link
              to="/cart-item"
              className="relative text-lg text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
