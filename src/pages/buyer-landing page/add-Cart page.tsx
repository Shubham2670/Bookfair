import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/Cart-Context";
import { Button, IconButton, Snackbar } from "@mui/material";
import { Delete, Remove, Add, ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart, date: new Date().toISOString() }),
      });

      if (response.ok) {
        clearCart(); 
        setOpenSnackbar(true); 
      }
    } catch (error) {
      console.error("Order placement failed", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-8  mt-[48px]">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart 🛒</h1>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/buyer-dashboard")}
          variant="text"
          color="primary"
        >
          Back to Books Dashboard
        </Button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 mt-4">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cart.map((book) => (
            <div
              key={book.id}
              className="flex items-center border-b py-4 last:border-none"
            >
              {/* Product Image */}
              <img
                src={book.image}
                alt={book.name}
                className="w-24 h-32 object-cover rounded-md"
              />

              {/* Product Details */}
              <div className="ml-6 flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {book.name}
                </h2>
                <p className="text-gray-600 text-sm">Seller: Book Store</p>
                <p className="mt-1 text-xl font-bold">₹{book.price}</p>
                <p className="text-green-600 text-sm font-semibold">71% Off • 1 offer available</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-3">
                  <IconButton
                    onClick={() => updateQuantity(book.id, book.quantity - 1)}
                    disabled={book.quantity === 1}
                    color="primary"
                  >
                    <Remove />
                  </IconButton>
                  <span className="px-4 text-lg">{book.quantity}</span>
                  <IconButton
                    onClick={() => updateQuantity(book.id, book.quantity + 1)}
                    color="primary"
                  >
                    <Add />
                  </IconButton>
                </div>

                {/* Save & Remove Buttons */}
                <div className="mt-3 space-x-6">
                  <Button color="primary">Save for Later</Button>
                  <Button
                    startIcon={<Delete />}
                    onClick={() => removeFromCart(book.id)}
                    color="error"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Place Order Button */}
          <div className="md:static  mt-6 flex justify-end">
            <Button variant="contained" color="warning" size="large" onClick={handlePlaceOrder}>
              PLACE ORDER
            </Button>
          </div>
        </div>
      )}

      {/* Snackbar for Order Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Order placed successfully!"
      />
    </div>
  );
};

export default CartPage;
