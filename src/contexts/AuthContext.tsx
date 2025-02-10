import axios from "axios";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/api-instance";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string) => void;
  logout: () => void;
}

interface User {
  name: ReactNode;
  isRegistered: boolean;
  id: number;
  email: string;
  role: "buyer" | "seller";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Only redirect if the user is on the login page
      if (location.pathname === "/login") {
        if (parsedUser.role === "buyer") {
          navigate("/buyer-dashboard", { replace: true });
        } else if (parsedUser.role === "seller") {
          navigate("/seller-dashboard", { replace: true });
        }
      }
    }
  }, [location.pathname, navigate, setUser])
  
  const login = async (email: string) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/users?email=${email}`);
      if (response.data.length > 0) {
        const loggedInUser: User = response.data[0];
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        if (loggedInUser.role === "buyer") {
          navigate("/buyer-dashboard");
        } else if (loggedInUser.role === "seller") {
          navigate("/seller-dashboard");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/login");
//   };
const logout = async () => {
    if (user) {
      try {
        await axiosInstance.patch(`http://localhost:3000/users/${user.id}`, {
          isLoggedIn: false
        });
      } catch (error) {
        console.error("Error logging out from server:", error);
      }
    }
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
