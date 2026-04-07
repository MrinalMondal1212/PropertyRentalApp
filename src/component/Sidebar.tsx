// import React from 'react'

import {
  CirclePlus,
  Delete,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { account } from "../lib/appwriteConfig";
import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("Logged out successfully 👋"); // 🔥 delete current session
      navigate("/"); // 🔥 redirect to home
    } catch (error) {
      console.log(error);
       toast.error("Logout failed ❌");
    }
  };
  const normalLink =
    "flex gap-[30px] p-2 rounded-lg transition-all text-gray-600";
  const activeLink =
    "flex gap-[30px] p-2 rounded-lg bg-black text-[#FFA400]  shadow-md";
  return (
    <div className="w-[15%] h-full border-r p-5 flex flex-col justify-between">
      <div className="flex flex-col gap-[35px]">
        {/* Logo Section */}
        <img
          className="brightness-0 h-[35px] mb-4"
          src="/images/logo.png"
          alt="logo"
        />

        {/* Dashboard Link - Use 'end' so it only highlights on the exact base path */}

        <NavLink
          to="/admindashboard"
          end
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <LayoutDashboard /> Dashboard
        </NavLink>

        {/* Add Properties Link */}
        <NavLink
          to="/admindashboard/addproperties"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <CirclePlus /> Add Property
        </NavLink>

        {/* Manage Properties Link */}
        <NavLink
          to="/admindashboard/removeproperties"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <Delete /> Remove
        </NavLink>
        {/* <NavLink
          to="/admindashboard/manageproperties"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <SquareChartGantt /> Manage
        </NavLink> */}
        <NavLink
          to="/admindashboard/booking"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <LayoutDashboard /> Bookings
        </NavLink>
      </div>

      {/* Logout at the bottom */}
      <div
        onClick={handleLogout}
        className="flex items-end cursor-pointer hover:text-red-500 transition-colors"
      >
        <p className="flex gap-[30px]">
          <LogOut /> Log Out
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
