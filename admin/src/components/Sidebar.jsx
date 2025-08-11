import React from "react";
import { NavLink } from "react-router-dom";
import { BsPlusSquare, BsCardList, BsCardChecklist } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs"; // add at the top

const Sidebar = () => {
  return (
    <div className="w-1/5 min-h-screen border-r border-r-slate-900/10">
      <div className="flex flex-col gap-10 pt-4 sm:pt-10 pl-[20%]">

        <NavLink 
          to="/add" 
          className={({ isActive }) => 
            isActive 
              ? "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 bg-gray-200 rounded-md px-2"
              : "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 rounded-md px-2 hover:bg-primary transition"
          }>
          <BsPlusSquare />
          <p className="hidden lg:flex">Add Items</p>
        </NavLink>

        <NavLink 
          to="/list" 
          className={({ isActive }) => 
            isActive 
              ? "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 bg-gray-200 rounded-md px-2"
              : "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 rounded-md px-2 hover:bg-primary transition"
          }>
          <BsCardList />
          <p className="hidden lg:flex">Item List</p>
        </NavLink>

        <NavLink 
          to="/orders" 
          className={({ isActive }) => 
            isActive 
              ? "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 bg-gray-200 rounded-md px-2"
              : "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 rounded-md px-2 hover:bg-primary transition"
          }>
          <BsCardChecklist />
          <p className="hidden lg:flex">Orders</p>
        </NavLink>

        <NavLink 
  to="/messages"
  className={({ isActive }) => 
    isActive 
      ? "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 bg-gray-200 rounded-md px-2"
      : "flex items-center gap-x-2 cursor-pointer h-10 max-w-40 border border-slate-900/15 rounded-md px-2 hover:bg-primary transition"
  }>
  <BsEnvelope />
  <p className="hidden lg:flex">Messages</p>
</NavLink>


      </div>
    </div>
  );
};

export default Sidebar;
