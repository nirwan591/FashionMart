import React from "react";
import { Link } from "react-router-dom";
import profile from "../assets/profile.jpg"
const Navbar = () => {
  return (
    <div className="max-padd-container flexBetween py-2">
      <Link to="/" className="mb-4">
        <h3 className="text-4xl font-bold">
          Fashion<span className="text-secondary">Mart</span>
          <p className="text-sm text-gray-600 relative -top-2 ml-1">Admin Panal</p>
        </h3>
      </Link>
      <img className="rounded-full " src={profile} alt="profileImg" height={46} width={46}/>
    </div>
  );
};

export default Navbar;
