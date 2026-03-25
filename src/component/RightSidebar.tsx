// import React from 'react'

import { User } from "lucide-react";

const RightSidebar = () => {
  return (
    <div className="border-l flex justify-center w-[15%] h-screen">
      <div className="bg-[#D9D9D9] flex flex-col items-center  mt-[50px] rounded-[40px] w-[200px] p-3 h-[434px]">
        <p className="font-medium text-[18px] mt-3">Recent Message</p>
        <div>
          <div className="w-[190px] mt-4 h-[60px] flex justify-center items-center gap-6 rounded-[40px] bg-[#000000]/25">
            <p className="w-[35px] flex justify-center items-center h-[35px] bg-black rounded-full">
              <User color="#E7A837" />{" "}
            </p>
            <div>
              <p className="font-medium">Robert Das</p>
              <p className="text-xs">Lorem sit amet...</p>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[190px] mt-4 h-[60px] flex justify-center items-center gap-6 rounded-[40px] bg-[#000000]/25">
            <p className="w-[35px] flex justify-center items-center h-[35px] bg-black rounded-full">
              <User color="#E7A837" />{" "}
            </p>
            <div>
              <p className="font-medium">Robert Das</p>
              <p className="text-xs">Lorem sit amet...</p>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[190px] mt-4 h-[60px] flex justify-center items-center gap-6 rounded-[40px] bg-[#000000]/25">
            <p className="w-[35px] flex justify-center items-center h-[35px] bg-black rounded-full">
              <User color="#E7A837" />{" "}
            </p>
            <div>
              <p className="font-medium">Robert Das</p>
              <p className="text-xs">Lorem sit amet...</p>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[190px] mt-4 h-[60px] flex justify-center items-center gap-6 rounded-[40px] bg-[#000000]/25">
            <p className="w-[35px] flex justify-center items-center h-[35px] bg-black rounded-full">
              <User color="#E7A837" />{" "}
            </p>
            <div>
              <p className="font-medium">Robert Das</p>
              <p className="text-xs">Lorem sit amet...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
