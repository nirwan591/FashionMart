import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";
import LoginPopup from "./LoginPopup";
import Navbar from "./Navbar";

const Header = () => {
  const { getTotalcartItems, token, setToken } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [header, setHeader] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formType, setFormType] = useState("Login");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setHeader(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full top-0 left-0 z-30 bg-white transition-all duration-300 ${header ? "shadow-md py-3" : "py-4"}`}>
        <div className="max-padd-container flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold">
            Fashion<span className="text-secondary">Mart</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Navbar />
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/cart" className="relative">
              <GiShoppingBag className="text-[26px] text-secondary" />
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full px-1">
                {getTotalcartItems()}
              </span>
            </Link>

            {!token ? (
              <>
                <button onClick={() => { setFormType("Login"); setShowLogin(true); }} className="btn-outline hidden md:block">Login</button>
                <button onClick={() => { setFormType("Sign Up"); setShowLogin(true); }} className="btn-secondary hidden md:block">Sign Up</button>
              </>
            ) : (
              <div className="relative group">
                <FaUserCircle className="text-xl cursor-pointer" />
                <ul className="hidden group-hover:flex flex-col absolute right-0 mt-2 bg-white shadow-md w-28 rounded text-sm z-10 p-2">
                  <li className="flex items-center gap-2 cursor-pointer p-1"><FiPackage /> Orders</li>
                  <hr className="my-1" />
                  <li className="flex items-center gap-2 cursor-pointer p-1" onClick={logout}><TbLogout /> Logout</li>
                </ul>
              </div>
            )}

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              {menuOpen ? (
                <MdClose className="text-3xl cursor-pointer" onClick={() => setMenuOpen(false)} />
              ) : (
                <MdMenu className="text-3xl cursor-pointer" onClick={() => setMenuOpen(true)} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white py-6 px-8 absolute w-full top-[100%] left-0 shadow-md z-20">
            <Navbar vertical onLinkClick={() => setMenuOpen(false)} />
            {!token && (
              <div className="mt-6 flex flex-col gap-2">
                <button onClick={() => { setFormType("Login"); setShowLogin(true); setMenuOpen(false); }} className="btn-outline">Login</button>
                <button onClick={() => { setFormType("Sign Up"); setShowLogin(true); setMenuOpen(false); }} className="btn-secondary">Sign Up</button>
              </div>
            )}
          </div>
        )}
      </header>

      {showLogin && <LoginPopup setShowLogin={setShowLogin} formType={formType} />}
    </>
  );
};

export default Header;
