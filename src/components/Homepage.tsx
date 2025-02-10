import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import books from "../assets/images/140805-776043754_medium.mp4";
import { booksData } from "../pages/utils/utils";
import { Footer } from "../common-components";
import { useAuth } from "../contexts/AuthContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isBuyerLoggedIn = localStorage.getItem("userRole") === "buyer";
  const { user } = useAuth();
  const roleBasedText =
    user?.role === "seller" ? "Become a Buyer" : "Become a Seller";
  const roleBasedLink =
    user?.role === "seller" ? "/register-buyer" : "/register-seller";
  const roleBasedbutton = user?.role ==="seller" ? "Add Books" :"Browse Books"
  const roleBasebuttonroute = user?.role === "seller" ? "/seller-Dashboard":"/buyer-dashboard"
  const handleBrowseBooks = () => {
    navigate("/buyer-dashboard");
  };
  const handleImageClick = () => {
    if (user?.role === "buyer") {
      navigate("/buyer-dashboard");
    }
  };

  return (
    <div className=" min-h-screenflex flex-col bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mt-6 flex items-center justify-center text-center text-white">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover md:object-fill"
          src={books}
        ></video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
            Welcome to the BookFair App
          </h1>
          <p className="mt-2 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto">
            Discover, buy, and sell books from multiple sellers in one place!
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 justify-center">
          <Link to={roleBasebuttonroute}>
            <button
              onClick={handleBrowseBooks}
              className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
            >
             {roleBasedbutton}
            </button>
            </Link> 
            <Link to={roleBasedLink}>
              <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto mt-4 sm:mt-0">
                {roleBasedText}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="py-12 px-4 sm:px-8 bg-white text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
            Featured Books
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {booksData.map((book: any) => (
              <div
                key={book.id}
                onClick={handleImageClick}
                className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-contain rounded-md mb-4"
                />
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">
                  {book.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
