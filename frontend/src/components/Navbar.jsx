import React, { useState } from "react";

const Navbar = ({ vertical = false, onLinkClick = () => {} }) => {
  const [isActive, setIsActive] = useState("home");

  const linkClass = (key) =>
    `${isActive === key ? "active-link" : ""} ${
      vertical ? "block py-2 text-base" : "inline-block px-3"
    }`;

  return (
    <nav className={`flex ${vertical ? "flex-col" : "gap-6"} font-medium`}>
      <a href="/" onClick={() => { setIsActive("home"); onLinkClick(); }} className={linkClass("home")}>Home</a>
      <a href="#categories" onClick={() => { setIsActive("categories"); onLinkClick(); }} className={linkClass("categories")}>Categories</a>
      <a href="#shop" onClick={() => { setIsActive("shop"); onLinkClick(); }} className={linkClass("shop")}>Shop</a>
      <a href="#contact" onClick={() => { setIsActive("contact"); onLinkClick(); }} className={linkClass("contact")}>Contact</a>
    </nav>
  );
};

export default Navbar;
