// import React from 'react'


import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";

const AdminWrapper = () => {
  return (
   // h-screen makes the dashboard fill the whole browser window
    <div className="flex flex-row h-screen overflow-hidden">
      
      {/* 1. Permanent Left Sidebar (15% width) */}
      <Sidebar />

      {/* 2. The Dynamic Middle Part (70% width) */}
      {/* overflow-y-auto allows the middle to scroll while sidebars stay still */}
      <main className="flex-1 bg-[#F5F7FB] overflow-y-auto">
        <Outlet />
      </main>

      {/* 3. Permanent Right Sidebar (15% width) */}
      <RightSidebar />
      
    </div>
  );
};

export default AdminWrapper;
