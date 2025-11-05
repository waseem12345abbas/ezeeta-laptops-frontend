import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaBoxOpen,
  FaEnvelope,
  FaUser,
  FaComments,
  FaInfoCircle,
  FaCheckCircle,
  FaCopy,
  FaMoneyBillWave,
  FaIdBadge,
  FaCalendarAlt,
  FaImage,
} from "react-icons/fa";

const OrderDetails = ({ order, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  console.log("Ordere details = ", order)

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!order)
    return (
      <div className="text-2xl font-black text-red-600 text-center my-10">
        No Item Selected
      </div>
    );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start py-5 justify-center overflow-auto z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-neutral-500 w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-400 p-6 text-white"
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-red-500 transition"
          >
            <FaTimes size={22} />
          </button>

          {/* 🏷️ Title */}
          <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
            Order Details
          </h2>

          {/* 🧾 Order Info */}
          <div className="grid md:grid-cols-2 gap-4 text-base">
            {/* Order ID */}
            <div className="flex items-center justify-between bg-neutral-400 px-4 py-3 rounded-lg shadow-sm border border-neutral-300">
              <div className="flex items-center gap-3">
                <FaBoxOpen className="text-yellow-400 text-lg" />
                <p className="font-medium text-black">
                  <strong>Order Number:</strong> {order.orderNumber}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-600 text-white font-semibold px-4 py-1 rounded-lg transition-all duration-300 shadow-md"
              >
                <FaCopy />
                {copySuccess ? (
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-green-200" /> Copied!
                  </span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>

            {/* MongoDB Object ID */}
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaIdBadge className="text-yellow-400" />
              <p className="text-black">
                <strong>Order ID:</strong> {order._id}
              </p>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaUser className="text-yellow-400" />
              <p className="text-black">
                <strong>Customer:</strong> {order.userID.name}
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaEnvelope className="text-yellow-400" />
              <p className="text-black">
                <strong>Email:</strong> {order.userEmail}
              </p>
            </div>

            {/* Payment ID */}
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaMoneyBillWave className="text-yellow-400" />
              <p className="text-black">
                <strong>Payment ID:</strong> {order.paymentId || "N/A"}
              </p>
            </div>

            {/* Order Amount */}
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaMoneyBillWave className="text-yellow-400" />
              <p className="text-black">
                <strong>Total Amount:</strong> Rs {order.orderAmount}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaInfoCircle className="text-yellow-400" />
              <p className="text-black">
                <strong>Status:</strong> {order.status}
              </p>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaCalendarAlt className="text-yellow-400" />
              <p className="text-black">
                <strong>Created:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-400 px-4 py-2 rounded-lg shadow-sm">
              <FaCalendarAlt className="text-yellow-400" />
              <p className="text-black">
                <strong>Updated:</strong>{" "}
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* 🖼️ Proof of Payment Image */}
          {order.proofImage && (
            <div className="mt-6 bg-neutral-400 p-4 rounded-lg shadow-md border border-neutral-300">
              <div className="flex items-center gap-3 mb-3">
                <FaImage className="text-yellow-400 text-xl" />
                <h3 className="text-lg font-bold text-black">Proof of Payment</h3>
              </div>
              <img
                src={`http://localhost:5000/uploads/${order.proofImage}`} // update to your backend image path
                alt="Payment Proof"
                className="rounded-xl border border-neutral-300 shadow-lg w-full max-h-96 object-contain hover:scale-[1.02] transition-all duration-300"
              />
            </div>
          )}

          {/* 🏠 Delivery Address */}
          {order.address && order.address.length > 0 && (
            <div className="bg-neutral-400 px-5 py-4 rounded-2xl shadow-md border border-neutral-300 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <FaInfoCircle className="text-yellow-400 text-xl" />
                <h3 className="text-lg font-bold text-black">Delivery Address</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-black text-base">
                <div className="bg-neutral-300 rounded-lg p-2 shadow-sm">
                  <span className="font-semibold">Name:</span>{" "}
                  {order.address[0].addrName}
                </div>
                <div className="bg-neutral-300 rounded-lg p-2 shadow-sm">
                  <span className="font-semibold">Phone:</span>{" "}
                  {order.address[0].addrPhone}
                </div>
                <div className="bg-neutral-300 rounded-lg p-2 shadow-sm">
                  <span className="font-semibold">City:</span>{" "}
                  {order.address[0].addrCity}
                </div>
                <div className="bg-neutral-300 rounded-lg p-2 shadow-sm sm:col-span-2">
                  <span className="font-semibold">Street:</span>{" "}
                  {order.address[0].addrStreet}
                </div>
              </div>
            </div>
          )}

          {/* 🛒 Cart Items */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 border-b pb-1 text-white">
              Cart Items
            </h3>
            <ul className="space-y-3">
              {order.cartItems?.map((item) => (
                <motion.li
                  key={item._id}
                  className="flex justify-between items-center bg-neutral-400 shadow-md rounded-lg p-3 border border-neutral-300 hover:bg-neutral-300 transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-semibold text-black">{item.itemName}</span>
                  <span className="text-sm text-black">
                    Qty: {item.itemQuantity} × Rs {item.itemPrice}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 💬 Extra Comment */}
          {order.comment && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 border-b pb-1 text-white flex items-center gap-2">
                <FaComments className="text-yellow-400" />
                Extra Comment
              </h3>
              <p className="bg-neutral-400 px-4 py-3 rounded-lg shadow-sm text-black">
                {order.comment}
              </p>
            </div>
          )}

          {/* 🔘 Close Button */}
          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={onClose}
              className="px-6 py-2 bg-neutral-800 text-white font-semibold rounded-full shadow-md hover:bg-neutral-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetails;
