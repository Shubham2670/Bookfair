import React, { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import { OrdersListProps } from "../../types";
import { Delete } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "../../contexts/AuthContext";

const OrdersList: React.FC<OrdersListProps> = ({ orders, onDelete }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const [acceptedOrders, setAcceptedOrders] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { user } = useAuth();
  const handleAccept = (orderId: string) => {
    setAcceptedOrders((prev) => [...prev, orderId]);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
        <thead>
          <tr className="bg-customGray">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Buyer Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">MRP</th>
            <th className="border p-2">Discount</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order: any) =>
            order.items.map((item: any, index: number) => (
              <tr
                key={`${order.id}-${item.id}`}
                className="odd:bg-customWhite even:bg-gray-50"
              >
                <td className="border p-2 text-center">{order.id}</td>
                <td className="border p-2 text-center">{user.name}</td>
                <td className="border p-2 text-center">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  <img
                    src={item.image}
                    alt={String(item.title)}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.author}</td>
                <td className="border p-2 text-center">₹{item.price}</td>
                <td className="border p-2 text-center line-through">
                  ₹{item.mrp}
                </td>
                <td className="border p-2 text-center">{item.discount}%</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                {index === 0 && (
                  <td
                    className="border p-2 text-center"
                    rowSpan={order.items.length}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Button
                        startIcon={<Delete />}
                        onClick={() => onDelete(order.id)}
                        className="!bg-customRed !text-white !px-3 !py-2 !rounded-lg hover:!bg-red-700 shadow-md transition-all"
                      >
                        Delete
                      </Button>
                      {acceptedOrders.includes(order.id) ? (
                        <span className="text-customGreen font-semibold">
                          Order Accepted
                        </span>
                      ) : (
                        <Button
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleAccept(order.id)}
                          className="!bg-customGreen !text-white !px-3 !py-2 !rounded-lg hover:!bg-red-700 shadow-md transition-all"
                        >
                          Accept
                        </Button>
                      )}
                      <div className="text-xs mt-1 text-customGrey">
                        Total: ₹
                        {order.items.reduce(
                          (acc: any, item: any) =>
                            acc + item.price * item.quantity,
                          0
                        )}
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Order Accepted Successfully!
        </Alert>
      </Snackbar>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
