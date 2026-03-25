// import React from 'react'

import { Mail, MapPin, PhoneCall } from "lucide-react";

const ContactUs = () => {
  return (
    <>
      <div className="w-[1600px] mt-[135px] text-white rounded-[40px] flex items-center  justify-center mx-auto h-[500px] bg-[url('/images/contactus.jpg')] bg-cover bg-center">
        <div className="w-[1200px]">
          <p className="text-[80px] font-semibold ">
            Contact <span className="text-[#E7A837]">Us</span>
          </p>
          <p className="font-extralight w-[900px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
            repellat ratione sequi? Nobis dolorum quos corrupti autem aliquid et
            veritatis iure doloremque hic! Vel eaque quidem, soluta libero
            nesciunt dolores magni sunt adipisci eligendi in? Sit distinctio
            omnis et excepturi culpa iste necessitatibus? Laboriosam, illo?
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-[100px]">  
        <div className="w-[1200px] h-[50vh] mb-[150px] flex ">
          <div className="border-r-[3px] w-[400px] flex flex-col gap-7 justify-center items-center h-[400px] ">
            <span className="h-[130px] w-[130px] rounded-full bg-black flex items-center justify-center">
              <Mail color="#E7A837" size={55} />
            </span>
            <p className="text-3xl font-semibold">Email</p>
            <p className="text-xl font-medium">mrinalmondal9883@gmail.com</p>
          </div>
          <div className="border-r-[3px] w-[400px] flex flex-col gap-7 justify-center items-center h-[400px] ">
            <span className="h-[130px] w-[130px] rounded-full bg-black flex items-center justify-center">
              <PhoneCall color="#E7A837" size={55} />
            </span>
            <p className="text-3xl font-semibold">Phone</p>
            <p className="text-xl font-medium">+91 7548034552</p>
          </div>
          <div className="border-r-[3px] w-[400px] flex flex-col gap-7 justify-center items-center h-[400px] ">
            <span className="h-[130px] w-[130px] rounded-full bg-black flex items-center justify-center">
              <MapPin color="#E7A837" size={55} />
            </span>
            <p className="text-3xl font-semibold">Address</p>
            <p className="text-xl font-medium">713166 Purba Bardhamman , <br />Jaugram</p>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default ContactUs;
