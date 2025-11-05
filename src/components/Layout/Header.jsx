import React, { useState } from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "./Navbar"; // ✅ Import Navbar
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Control sidebar
  const itemsLength = useSelector((state) => state.cart.cart);

  return (
    <>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-neutral-500 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex justify-between items-center gap-4">
         <div className="flex gap-1">
           {/* Left: Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 animate-bounce duration-1000 ease-in-out"
          >
            <Link to={'/'}>
             <img
              src="/logo/ezeeta.png"
              alt="Logo"
              className="h-20 w-auto rounded-md shadow-md bg-transparent"
            />
            </Link>
           
          </motion.div>

         </div>
          {/* Right: Menu & Cart */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 text-black hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-black text-blue-300 text-xs rounded-full px-[6px] font-bold shadow-md">
                {itemsLength.length > 0 ? itemsLength.length : 0}
              </span>
            </Link>

            {/* Menu Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center p-2 rounded-full border border-blue-400 bg-gradient-to-br from-black to-gray-800 text-blue-300 hover:bg-gradient-to-t hover:shadow-lg transition-all duration-300"
            >
              <FaBars size={20} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Sidebar Navbar */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Header;
