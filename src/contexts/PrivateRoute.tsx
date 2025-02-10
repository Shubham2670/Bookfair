import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import { ReactNode } from "react";

const ProtectedRoute = ({ children, allowedRoles }:{children: ReactNode , allowedRoles:any}) => {
  const { user } = useAuth(); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;


