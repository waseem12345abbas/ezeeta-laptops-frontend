import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-black text-white pt-10 pb-6 px-6 md:px-16 overflow-hidden">
      {/* Glassy overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/20 pb-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide mb-3 text-[#FFD700] drop-shadow-md">
            Ezeeta Laptops
          </h2>
          <p className="text-sm text-[#FFF8E7] leading-relaxed">
            Zeeta Laptops brings you premium laptops from top brands. Shop
            smart, work faster, and experience true performance — wherever you
            are!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#FDE68A] border-b border-blue-400 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-[#FFF8E7]">
            {[
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Contact", path: "/contact" },
              { name: "Careers", path: "/careers" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-[#FFD700] transition duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#FDE68A] border-b border-blue-400 inline-block pb-1">
            Contact
          </h3>
          <ul className="text-sm text-[#FFF8E7] space-y-2">
            <li>
              <span className="text-[#FFD700] font-medium">Email:</span>{" "}
              support@sroms.com
            </li>
            <li>
              <span className="text-[#FFD700] font-medium">Phone:</span> +92 300
              1234567
            </li>
            <li>
              <span className="text-[#FFD700] font-medium">Address:</span>{" "}
              Lahore, Pakistan
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#FDE68A] border-b border-blue-400 inline-block pb-1">
            Follow Us
          </h3>
          <div className="flex space-x-5">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaYoutube />, link: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="text-2xl text-[#FFF8E7] hover:text-[#FFD700] hover:scale-110 transform transition duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="relative text-center text-sm text-[#FFF8E7] pt-6 tracking-wide">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-[#FFD700] font-semibold">Ezeeta Laptops</span>.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
