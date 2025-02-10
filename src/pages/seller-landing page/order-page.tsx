import React, { useState } from "react";
import { OrdersListProps } from "../../types";

const OrdersList: React.FC<OrdersListProps> = ({ orders, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
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
          {currentOrders.map((order) =>
            order.items.map((item) => (
              <tr key={`${order.id}-${item.id}`} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2 text-center">{order.id}</td>
                <td className="border p-2 text-center">{new Date(order.date).toLocaleString()}</td>
                <td className="border p-2 text-center">
                  <img src={item.image} alt={String(item.title)} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.author}</td>
                <td className="border p-2 text-center">₹{item.price}</td>
                <td className="border p-2 text-center line-through">₹{item.mrp}</td>
                <td className="border p-2 text-center">{item.discount}%</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => onDelete(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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