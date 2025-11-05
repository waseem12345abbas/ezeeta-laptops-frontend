import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import api from "../../api";
import { usePopup } from "../hooks/usePopUp";
import Popup from "../PopUp";
import OrderDetails from "./OrderDetails";
import {
  FaEye,
  FaUser,
  FaRupeeSign,
  FaCalendarAlt,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // states for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // get the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders?.slice(indexOfFirstItem, indexOfLastItem);
  // searching
  const [searchTerm, setSearchTerm] = useState("");

  // popup hook
  const { popup, showPopup, hidePopup } = usePopup();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/allOrders");
      setOrders([...res.data.data].reverse());
      console.log("first order", res.data.data[res.data.data.length - 1]);
    } catch (err) {
      setError(err.message);
      showPopup("Failed to fetch orders", "error");
    }
  };

  // Initial fetch
  const searchOrders = async () => {
    try {
      const res = await api.get(`/api/searchOrders?search=${searchTerm}`);
      if (res.data.success) {
        setOrders([...res.data.data].reverse());
        setCurrentPage(1); // Reset to first page on search
      } else {
        setOrders([]);
        showPopup("No orders found matching the search criteria.", "info");
      }
    } catch (error) {
      showPopup("Search failed. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchOrders();

    // Setup socket connection for real-time updates
    const socket = io("http://localhost:5000");

    // Listen for new orders
    socket.on("newOrder", (newOrder) => {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      showPopup("New order received!", "success");
    });

    return () => socket.disconnect();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const updated = orders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      );
      setOrders(updated);
      const ress = await api.put(`/api/updateOrderStatus/${id}`, {
        status: newStatus,
      });
      if (ress.status === 200) {
        showPopup("Order updated successfully!", "success");
      }
    } catch (error) {
      showPopup("Failed to update. Please login again.", "error");
    }
  };

  return (
    <div className="shadow w-full overflow-x-auto relative">
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-black text-center font-bold text-4xl mt-4">Orders Dashboard</h1>
      </div>

      {/* Search Bar Section */}
      <div className="flex justify-center items-center mb-8">
        <div className="relative w-full max-w-md">
          <button
            onClick={fetchOrders}
            className="text-black underline rounded-sm cursor-pointer absolute right-2 top-1/2 -translate-y-1/2  hover:text-black font-semibold transition-all duration-300"
          >
            View All
          </button>
          <input
            type="text"
            placeholder="Search by status, username, email, or user ID..."
            className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white border-2 border-neutral-500 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all duration-300 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-lg cursor-pointer hover:text-yellow-600 transition-all duration-300"
            onClick={searchOrders} // optional function, e.g. to trigger manual search
          />
        </div>
      </div>

      {/* Popup */}
      <Popup
        show={popup.show}
        message={popup.message}
        type={popup.type}
        onClose={hidePopup}
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <div className="">
        <table className="min-w-full text-left mx-5 bg-neutral-500">
          <thead className="uppercase bg-black text-white tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Details</th>
              <th className="px-6 py-3 text-left font-semibold">Customer</th>
              <th className="px-6 py-3 text-left font-semibold">Total</th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            {error ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 text-center text-red-600 text-lg font-semibold"
                >
                  Error: {error}
                </td>
              </tr>
            ) : (
              currentOrders?.map((order, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className="text-white border-b border-gray-700 hover:bg-neutral-600 transition-colors"
                >
                  {/* View Details Button */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-neutral-400 text-black px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-red-500/40 hover:scale-105 transition-all duration-300"
                    >
                      View Details
                    </button>
                  </td>

                  {/* Customer Name */}
                  <td className="px-6 py-4   text-gray-800 font-medium flex items-center gap-2">
                    <FaUser className="text-yellow-400" />
                    {order.userName}
                  </td>

                  {/* Total Amount */}
                  <td className="px-6 py-4 text-gray-700 font-semibold">
                    <span className="text-yellow-400 text-base font-black font-mono mr-2">
                      RS
                    </span>
                    {order.cartItems
                      ?.reduce(
                        (total, i) => total + i.itemPrice * i.itemQuantity,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-6 py-4">
                    <select
                      className="bg-neutral-400 text-black px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-red-500/40 hover:scale-105 transition-all duration-300"
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <option value="">Status</option>
                      <option value="Confirmed">Confirmed Order</option>
                      <option value="Rejected">Reject Order</option>
                    </select>
                  </td>

                  {/* Order Date */}
                  <td className="px-6 py-4 text-black font-medium flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {/* previous page */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 bg-neutral-800 text-white rounded-lg font-semibold shadow-md hover:bg-neutral-600 hover:shadow-lg transition-all duration-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        {/* page numbers */}
        {Array.from(
          { length: Math.ceil(orders.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-yellow-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        {/* next page */}
        <button
          disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 bg-neutral-800 text-white rounded-lg font-semibold shadow-md hover:bg-neutral-600 hover:shadow-lg transition-all duration-300 ${
            currentPage === Math.ceil(orders.length / itemsPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
