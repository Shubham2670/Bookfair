import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/Cart-Context";
interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Sidebar: React.FC<SidebarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);
  return (
    <>
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
              <ShoppingCartIcon />
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
    </>
  );
};
