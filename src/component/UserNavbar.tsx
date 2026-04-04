// import React from 'react'

import { CheckCheck, ChevronDown, Clock,  MoveUpRight,Star } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
const UserNavbar = () => {
  const navigate = useNavigate();

  const normalLink =
    "flex gap-[30px] p-2 rounded-lg transition-all text-white-600";
  const activeLink =
    "flex gap-[30px] p-2  rounded-lg bg-black border-2 border-[#FFA400] text-[#FFA400] shadow-md";
  return (
    <>
      <nav className="fixed top-0 w-full flex justify-center z-50">
        <div className="w-[1600px] flex flex-col items-center">
          {/* Top Contact Bar */}
          <div className="w-full flex justify-center">
            <div className="w-[1600px] h-[60px] rounded-[40px] text-white bg-black flex items-center px-5 mt-1">
              <div className="flex w-full justify-between items-center">
                {/* Contact Info */}
                {/* Value Info */}
                <div className="flex items-center gap-8 text-sm">
                  <p className="text-gray-300 flex gap-2 text-base"><CheckCheck/> Verified Properties</p>
                  <p className="text-gray-300 flex gap-2 text-base "><Star color="yellow"/> Trusted by 500+ Users</p>
                  <p className="text-gray-300 flex gap-2 text-base"><Clock/> 24/7 Support</p>
                </div>

                {/* Language + Login */}
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate("/register")}
                    className="flex items-center gap-2 px-6 py-2 border border-transparent rounded-full transition-all duration-300 hover:bg-black hover:text-[#E7A837] font-medium"
                  >
                    Register
                    <ChevronDown size={18} />
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 px-6 py-2 border border-transparent rounded-full transition-all duration-300 hover:bg-black hover:text-[#E7A837] font-medium"
                  >
                    Log In
                    <ChevronDown size={18} />
                  </button>
                  <button
                    onClick={() => navigate("/myorders")}
                    className="flex items-center gap-2 px-6 py-2 border border-transparent rounded-full transition-all duration-300 hover:bg-black hover:text-[#E7A837] font-medium"
                  >
                    My Orders
                    <ChevronDown size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navbar */}
          <div className="w-[1600px] flex justify-between ">
            {/* Menu Section */}
            <div className="w-[1418px] h-[60px] rounded-[40px] text-white bg-black flex items-center px-5 mt-1">
              <div className="flex w-full items-center">
                {/* Logo */}
                <img className="h-[35px]" src="/images/logo.png" alt="logo" />

                {/* Menu */}
                <div className="flex w-full justify-evenly text-lg ml-5">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to="/"
                  >
                    Home
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to="/aboutus"
                  >
                    About Us
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to="/services"
                  >
                    Our Services
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to="/gallery"
                  >
                    Gallery
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to="/properties"
                  >
                    Properties
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to="/faq"
                  >
                    FAQ
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to="/termsandconditions"
                  >
                    Terms & Conditions
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="w-[170px] h-[60px] rounded-[40px] text-white bg-black flex items-center justify-between pl-5 mt-1 pr-1">
              <p className="text-[#E7A837] transition-all duration-300 hover:bg-black hover:text-white cursor-pointer">
                Contact Us
              </p>

              <Link
                to="/contactus"
                className="w-[50px] h-[50px] flex justify-center transition-all duration-300 hover:bg-black hover:text-[#E7A837] items-center bg-white rounded-full"
              >
                <MoveUpRight size={20} color="#E7A837" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
