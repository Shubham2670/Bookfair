import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import SellerProfile from "./seller-profile";
import BuyerProfile from "./buyer-profile";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-red-500 text-xl font-semibold">
          User not found!
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] mx-auto mt-20 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 flex flex-col">
  {/* My Profile & Back Button in One Row */}
  <div className="p-4 flex justify-between items-center">
    <h3 className="text-lg font-semibold">My Profile</h3>
    <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate("/")}
    >
      Back to Homepage
    </Button>
  </div>

  {/* Header with Avatar */}
  <div className="bg-indigo-600 p-6 text-white text-center">
    <div className="flex justify-center">
      <img
        src={user.avatar || "https://i.pravatar.cc/100"} 
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
      />
    </div>
    <h1 className="text-2xl font-bold mt-3">{user.name}</h1>
    <p className="text-sm opacity-80">{user.email}</p>
  </div>

  {/* Profile Details */}
  <div className="p-6 flex-grow">
    <div className="flex items-center space-x-4">
      <span className="text-gray-500 font-medium">Role:</span>
      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
        {user.role.toUpperCase()}
      </span>
    </div>

    <div className="mt-4">
      {user.role === "seller" ? (
        <SellerProfile />
      ) : user.role === "buyer" ? (
        <BuyerProfile />
      ) : (
        <p className="text-red-500">Invalid role</p>
      )}
    </div>
  </div>
</div>

  );
};

export default Profile;
