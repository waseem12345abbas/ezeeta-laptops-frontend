import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchProducts } from "../../state_manage/features/products/productsSlice";
import { addToCart } from "../../state_manage/features/cart/Cart";
import { motion, AnimatePresence } from "framer-motion";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get products from redux
  const { products: allProducts = [], status, error } = useSelector((state) => state.products || {});
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // filter today's specials
  const todaySpecial = Array.isArray(allProducts) ? allProducts.filter((p) => p && p.isSpecialDeal === true) : [];
  // reset currentSlide if number of slides changes
  useEffect(() => {
    setCurrentSlide((prev) => {
      if (todaySpecial.length === 0) return 0;
      return prev % todaySpecial.length;
    });
  }, [todaySpecial.length]);

  // auto-advance timer (cleared on unmount or pause)
  useEffect(() => {
    // clear previous timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (todaySpecial.length > 1 && !isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % todaySpecial.length);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [todaySpecial.length, isPaused]);

  // manual navigation resets timer so user has time to view
  const goTo = (index) => {
    if (todaySpecial.length === 0) return;
    setCurrentSlide(index % todaySpecial.length);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % todaySpecial.length);
      }, 5000);
    }
  };

  // pause on hover (desktop) or touch (mobile)
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  const prevSlide = () => {
    try {
      if (todaySpecial.length === 0) return;
      setCurrentSlide((prev) => (prev - 1 + todaySpecial.length) % todaySpecial.length);
      // reset timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % todaySpecial.length);
        }, 5000);
      }
    } catch (error) {
      console.error("Error in prevSlide:", error);
    }
  };

  const nextSlide = () => {
    try {
      if (todaySpecial.length === 0) return;
      setCurrentSlide((prev) => (prev + 1) % todaySpecial.length);
      // reset timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % todaySpecial.length);
        }, 5000);
      }
    } catch (error) {
      console.error("Error in nextSlide:", error);
    }
  };

  if (status === "loading") return <div className="text-center text-gray-700 py-20">Loading...</div>;
  if (error) return <p className="text-center text-red-500 py-20">Error: {typeof error === 'string' ? error : error?.message || 'An error occurred'}</p>;

  if (todaySpecial.length === 0) {
    return (
      <div className="relative h-96 md:h-screen overflow-hidden bg-white shadow-lg flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">Welcome to EZeeta Laptops</h1>
          <p className="text-lg text-black md:text-xl mb-8 leading-relaxed max-w-lg">
            No special deals available at the moment. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="relative overflow-hidden my-20  bg-white shadow-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Logo at top left */}
        <div className="text-xl md:text-4xl flex items-center justify-center font-sans">
          <span className=" text-blue-700 font-bold">E</span>
          <span className=" text-neutral-500 font-bold">Z</span>
          <span className=" font-bold">EETA</span>
          <span className="font-bold ml-2 text-nowrap">Certified Laptops</span>
        </div>
        {/* Fade Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex items-center justify-center h-full"
          >
            <div className="flex flex-col md:flex-row items-center justify-center h-full max-w-7xl mx-auto px-4 py-20">
              {/* IMAGE */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                {/* Always render the fallback circle, hidden initially */}
                <div
                  className="fallback-circle flex items-center justify-center w-54 h-54 rounded-full text-white text-2xl sm:text-4xl  font-bold bg-gradient-to-br from-neutral via-black to-blue-500 shadow-2xl animate-pulse"
                  style={{ display: "none" }}
                >
                  {todaySpecial[currentSlide]?.brand}
                </div>
                {((todaySpecial[currentSlide]?.images && todaySpecial[currentSlide].images.length && todaySpecial[currentSlide].images[0]) ||
                  todaySpecial[currentSlide]?.image) ? (
                  <img
                    src={
                      (todaySpecial[currentSlide]?.images && todaySpecial[currentSlide].images.length && todaySpecial[currentSlide].images[0]) ||
                      todaySpecial[currentSlide]?.image ||
                      "https://via.placeholder.com/600x400?text=Zeeta+Laptops"
                    }
                    alt={todaySpecial[currentSlide]?.name || `slide-${currentSlide}`}
                    className="w-64 h-40 md:w-76 md:h-76 lg:h-96 lg:w-96 object-contain rounded-md shadow-lg"
                    onError={(e) => {
                      e.target.style.display = "none"; // hide broken image
                      e.target.parentNode.querySelector(
                        ".fallback-circle"
                      ).style.display = "flex";
                    }}
                  />
                ) : null}
              </div>

              {/* TEXT */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left p-4">
                <h1 className="text-xl md:text-4xl font-bold text-black mb-3">{todaySpecial[currentSlide]?.name}</h1>
                <h2 className="text-xl md:text-2xl mb-4 text-black font-semibold">
                  RS {todaySpecial[currentSlide]?.price ?? todaySpecial[currentSlide]?.discountPrice ?? "N/A"}
                </h2>
                <p className="max-w-sm text-base md:text-lg mb-6 leading-relaxed md:max-w-md lg:max-w-lg text-gray-700">
                  {todaySpecial[currentSlide]?.description || "Excellent deal — click to view details."}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      try {
                        navigate(`/product/${todaySpecial[currentSlide]?._id}`);
                      } catch (error) {
                        console.error("Error navigating to product details:", error);
                      }
                    }}
                    className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:scale-105 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      try {
                        dispatch(addToCart(todaySpecial[currentSlide]));
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                      }
                    }}
                    className="px-4 py-2 bg-white text-black border rounded-md shadow hover:bg-gray-50 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next buttons (visible on all sizes) */}
        <button
          aria-label="Previous slide"
          onClick={prevSlide}
          className="absolute top-1/2 left-2 bg-neutral-300 text-black p-3 rounded-full shadow-md hover:scale-105 transition z-20"
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        <button
          aria-label="Next slide"
          onClick={nextSlide}
          className="absolute top-1/2 right-2 bg-neutral-300 text-black p-3 rounded-full shadow-md hover:scale-105 transition z-20"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>

        {/* Thumbnails under the hero */}
        <div className="bg-neutral-300 rounded-2xl p-4 z-20">
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {todaySpecial?.map((special, id) => (
              <button
                key={special._id || id}
                onClick={() => goTo(id)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                  id === currentSlide ? "border-neutral-500 scale-110" : "border-white/50 hover:border-white"
                }`}
                aria-label={`Go to slide ${id + 1}`}
              >
                {((special?.images && special.images.length && special.images[0]) ||
                  special?.image) ? (
                  <img
                    src={
                      (special?.images && special.images.length && special.images[0]) ||
                      special?.image ||
                      "https://via.placeholder.com/80x80?text=Zeeta"
                    }
                    alt={special.name || `thumbnail-${id}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-bold rounded-md">
                    {special?.name?.slice(0, 3)?.toUpperCase()}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering HeroCarousel:", error);
    return (
      <div className="relative h-96 md:h-screen overflow-hidden bg-white shadow-lg flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">Oops! Something went wrong</h1>
          <p className="text-lg text-black md:text-xl mb-8 leading-relaxed max-w-lg">
            We're sorry, but an error occurred while loading the carousel. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }
};

export default HeroCarousel;
