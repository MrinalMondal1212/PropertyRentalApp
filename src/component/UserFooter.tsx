// import React from 'react'

import {
  Copyright,
  FacebookIcon,
  Instagram,
  MoveUpRight,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <div className="w-full flex justify-center mt-[185px] ">
      <div className="w-[1600px]  flex justify-center items-center  rounded-[40px] bg-black h-[900px] mb-3">
        <div className="w-[1250px] text-white flex flex-col  h-[600px]">
          {/* first part of the footer */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col font-light  gap-3">
              <p className="mb-[35px] ">Menu</p>
              <Link to="/" className="hover:text-[#E7A837] cursor-pointer">
                Home
              </Link>
              <Link
                to="/aboutus"
                className="hover:text-[#E7A837] cursor-pointer"
              >
                ABOUT US
              </Link>
              <Link
                to="/ourservices"
                className="hover:text-[#E7A837] cursor-pointer"
              >
                OUR SERVICE
              </Link>
              <Link
                to="/communities"
                className="hover:text-[#E7A837] cursor-pointer"
              >
                COMMUNITIES
              </Link>
              <Link
                to="/gallery"
                className="hover:text-[#E7A837] cursor-pointer"
              >
                GALLERY
              </Link>
              <Link
                to="/portfolio"
                className="hover:text-[#E7A837] cursor-pointer"
              >
                PORTFOLIO
              </Link>
              <Link to="/faq" className="hover:text-[#E7A837] cursor-pointer">
                FAQ
              </Link>
              <Link
                to="/termsandcondition"
                className="hover:text-[#E7A837] cursor-pointer"
              >
                TERMS AND CONDITIONS
              </Link>
            </div>
            {/* second part of the footer */}
            <div className="flex font-light flex-col gap-3">
              <p className="mb-[35px]">Write for us</p>
              <p className="w-[250px] font-light">
                We are open to publishing guest posts related to graphic and web
                design. These could be tutorials, useful graphic/web design
                resources or in-depth guides. If would like to contribute, we
                would love to hear from you. Please contact us using the button
                below.
              </p>
              <Link
                to="/contactus"
                className="mt-5 font-light w-[220px] h-[65px] items-center rounded-[72px] justify-between text-[20px] pr-1 pl-10 border-2 border-[#E7A837] bg-white flex text-[#E7A837] transition-all duration-500 hover:bg-black group"
              >
                Contact Us
                <p className="w-[55px] flex justify-center items-center h-[55px] rounded-full bg-black border border-transparent transition-all duration-300 group-hover:bg-[#E7A837] group-hover:border-black">
                  <MoveUpRight className="text-white group-hover:text-black transition-colors" />
                </p>
              </Link>
            </div>
            {/* third part of the footer */}
            <div className="flex flex-col text-black font-light gap-3">
              <button className="mb-3 w-[220px] h-[65px] items-center rounded-[72px] justify-between text-[20px] pr-1 pl-10 border-2    flex text-black bg-[#F5E5C7]">
                Contact Us{" "}
              </button>
              <input
                type="text"
                className="h-[70px]  p-[35px] w-[560px] rounded-[40px] border border-[#E7A837]"
                placeholder="Name*"
              />
              <input
                type="text"
                className="h-[70px] p-[35px] w-[560px] rounded-[40px] border border-[#E7A837]"
                placeholder="Email*"
              />
              <input
                type="text"
                className="h-[180px] p-[35px] w-[560px] rounded-[40px] border border-[#E7A837]"
                placeholder="Message*"
              />
              <button
                className="mt-[80px] w-[220px] h-[65px] items-center rounded-[72px] 
  justify-between text-[20px] pr-1 pl-10 bg-white flex text-[#E7A837]
  transition-all duration-300 group
  hover:bg-[#E7A837] hover:text-black hover:shadow-lg hover:scale-105"
              >
                Send
                <p
                  className="w-[55px] flex justify-center items-center h-[55px] rounded-full bg-black
    transition-all duration-300 group-hover:bg-white group-hover:rotate-45"
                >
                  <MoveUpRight className="text-[#E7A837] group-hover:text-black transition-all duration-300" />
                </p>
              </button>
            </div>
          </div>
          {/* this is the icon section of footer */}
          <div className="flex justify-center mt-[25px]  gap-3">
            <button className="border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white">
              <FacebookIcon color="black" />
            </button>
            <button className="border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white">
              <Twitter color="black" />
            </button>
            <button className="border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white">
              <Instagram color="black" />
            </button>
          </div>
          <div className="flex justify-between mt-[40px] items-center">
            <div className="flex">
              <Copyright />
              <p>Copyright 2026 -Homez.All Reserved</p>
            </div>
            <div className="flex gap-8">
              <p>Privacy policy</p>
              <p>Terms and conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFooter;
