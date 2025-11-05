import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DeliveryAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    deliveryInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!address.name || !address.phone || !address.email || !address.street || !address.city || !address.state || !address.postalCode || !address.country) {
      alert("Please fill in all required fields.");
      return;
    }
    // Navigate to proof-of-order with cartItems and address
    navigate("/proof-of-order", {
      state: { cartItems, address },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          Delivery Address
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
         <div className="flex gap-2">
           <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
            className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={address.email}
            onChange={handleChange}
           className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            required
          />
         </div>


         <div className="flex gap-2">
     <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State/Province"
            value={address.state}
            onChange={handleChange}
           className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            required
          />
         </div>

         <div className="flex gap-2">
            <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleChange}
           className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleChange}
            className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            required
          />
         </div>
          <textarea
            name="deliveryInstructions"
            placeholder="Delivery Instructions (Optional)"
            value={address.deliveryInstructions}
            onChange={handleChange}
            className="w-full placeholder:text-black bg-neutral-300 shadow-neutral-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-md"
            rows="3"
          />

          <div className="flex items-center justify-center">
             <button
            type="submit"
            className="bg-black hover:bg-neutral-700 text-white py-3 px-2 rounded-xl font-semibold shadow-md hover:scale-105 transition"
          >
            Proceed to Payment
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryAddress;