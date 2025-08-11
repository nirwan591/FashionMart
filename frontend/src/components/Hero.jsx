import React, { useState, useEffect, useRef } from "react";
import { BsFire } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Hook to navigate
import { FiSearch } from "react-icons/fi";

const images = [
  "/assets/bg4.jpg",
  "/assets/bg1.jpg",
  "/assets/bg2.jpg",
  "/assets/bg3.jpg",
];

const Hero = () => {
  const [index, setIndex] = useState(0); // Index for background image slideshow
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [suggestions, setSuggestions] = useState([]); // Suggestions list from backend
  const [showDropdown, setShowDropdown] = useState(false); // Show/hide suggestions dropdown

  const searchRef = useRef(); // Ref for detecting clicks outside search area
  const navigate = useNavigate(); // Hook to navigate to product detail page

  // Background image slideshow - changes image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch suggestions as user types (debounced)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/product/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setSuggestions(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
      }
    }, 300); // debounce delay 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Close dropdown if user clicks outside the search area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle clicking on a suggestion: set input value, hide dropdown, navigate
  const handleSuggestionClick = (product) => {
    setSearchQuery(product.name);
    setShowDropdown(false);
    navigate(`/product/${product._id}`); // Navigate to product detail page
  };

  return (
    <section
      id="home"
      className="relative max-padd-container h-[600px] w-full overflow-hidden mt-[80px]"
    >
      {/* Background Images Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>

      {/* Search Bar Container - centered horizontally with max width */}
      <div
        className="absolute z-10 w-full flex justify-center top-10 px-4"
        ref={searchRef}
      >
        {/* Wrapper with max-width and margin auto to center */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-xl mx-auto ">
          {/* Search Icon */}
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-base sm:text-lg" />
          {/* Search Input */}
          <input
            type="text"
            className="w-full rounded-full px-4 py-2 sm:py-3 outline-none border border-gray-300 focus:border-black text-sm sm:text-base"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true);
            }}
          />

          {/* Suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-xl max-h-60 overflow-y-auto shadow-md z-20">
              {suggestions.map((product) => (
                <li
                  key={product._id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleSuggestionClick(product)}
                >
                  {/* Product Image from backend uploads folder */}
                  <img
                    src={`http://localhost:4000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{product.name}</span>
                    <span className="text-xs text-gray-500">${product.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Hero Text Content */}
      <div className="relative max-w-[666px] top-44 xs:top-72 z-10">
        <h4 className="flex items-baseline gap-x-2 uppercase text-secondary medium-18">
          Modern collection <BsFire />
        </h4>
        <h2 className="h1 capitalize text-primary ">
          Grab Upto 20% off On Selected Products
        </h2>

        <div className="flex items-center gap-x-4 mt-7">
          <a
            href="#shop"
            className="btn-secondary rounded-full flexCenter gap-x-2"
          >
            Shop Products <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
