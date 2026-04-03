// import React from 'react'

import { ChevronDown, MoveUpRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";
import { useNavigate } from "react-router-dom";
import PropertySection from "../component/PropertySection";
const Home = () => {
  //   const villas = properties.filter(p => p.type === "Villa");
  // const apartments = properties.filter(p => p.type === "Apartment");
  const navigate = useNavigate();
  const [selected, setSelected] = useState("New York City");
  const { properties, loading, error } = useSelector(
    (state: any) => state.adminproducts,
  );
  
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  // this is the code where property type will be add in different palces !!!!
  const villas = properties.filter(
    (p: any) => p.type?.toLowerCase() === "villa",
  );

  const apartments = properties.filter(
    (p: any) => p.type?.toLowerCase() === "apartment",
  );

  const bungalows = properties.filter(
    (p: any) => p.type?.toLowerCase() === "bungalow",
  );

  const cities = ["New York City", "Los Angeles", "Chicago", "Houston"];
  return (
    <div className="w-full mt-[135px]  flex flex-col justify-center items-center">
      <div className="h-[1076px] rounded-[40px] w-[1600px] bg-[linear-gradient(269.94deg,rgba(249,249,249,0)_31.15%,rgba(92,92,92,0.41)_49.66%,rgba(68,68,68,0.51)_61.21%,rgba(52,52,52,0.68)_73.82%,rgba(30,30,30,0.75)_86.43%,rgba(0,0,0,0.92)_99.94%),url('/images/HeroSectionimage.jpg')]  bg-cover bg-center flex   flex-col items-center  justify-evenly">
        <div className=" w-[1250px] ">
          <p className="font-semibold tracking-tighter text-white leading-[80px] text-[80px]">
            Affordable Housing <br /> In{" "}
            <span className="text-[#FFC358]">Lagos Island</span>
          </p>
          <p className="font-thin mt-[50px] text-white text-[20px]">
            Figma ipsum component variant main layer. Text main arrange bold
            layer.
            <br /> Main export device create outline ellipse auto. Plugin create
            rotate stroke align star style <br /> edit mask
          </p>
          <button className="mt-[80px] w-[220px] h-[65px] items-center rounded-[72px] justify-between text-[20px] pr-1 pl-10   bg-white flex text-[#E7A837]">
            view more{" "}
            <p className="w-[55px] flex justify-center items-center h-[55px] rounded-full bg-black">
              <MoveUpRight />
            </p>
          </button>
        </div>
        {/* hero section second container the blur container */}
        <div className="  backdrop-blur-md p-6 rounded-[40px]  h-[250px] w-[1250px] ">
          <div className="flex gap-[40px]">
            <p className="text-[30px] text-[#E7A837] font-semibold">
              Buy
            </p>
          </div>

          {/* drop down start */}
          <div className="flex mt-5 ">
            {/* first drop down it is  */}
            <div className="w-[220px] h-[95px]  border-r-[3px] border-[#E7A837]">
              <p className="text-[#E7A837] text-[25px] mt-3">Location</p>
              <div className=" ">
                <div className="relative inline-block group mt-4 font-thin">
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="
            appearance-none 
            bg-transparent 
            text-white 
            text-2xl  
            pr-12 
            focus:outline-none 
            cursor-pointer
            rounded-sm
          "
                  >
                    {cities.map((city) => (
                      <option
                        key={city}
                        value={city}
                        className="bg-[#333] text-white"
                      >
                        {city}
                      </option>
                    ))}
                  </select>

                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-white text-xl font-light">
                      {" "}
                      <ChevronDown />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  w-[700px] justify-evenly">
              {/* second drop down it is  */}
              <div className="w-[220px] h-[95px]  border-r-[3px] border-[#E7A837]">
                <p className="text-[#E7A837] text-[25px] mt-3">Property Type</p>
                <div className=" ">
                  <div className="relative inline-block group mt-4 font-thin">
                    {/* The Blue Border & Background matching your screenshot */}
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      className="
            appearance-none 
            bg-transparent 
            text-white 
            text-2xl  
            pr-12 
            focus:outline-none 
            cursor-pointer
            rounded-sm
          "
                    >
                      {cities.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="bg-[#333] text-white"
                        >
                          {city}
                        </option>
                      ))}
                    </select>

                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-white text-xl font-light">
                        {" "}
                        <ChevronDown />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* third drop down it is */}
              <div className="w-[220px] h-[95px]  ">
                <p className="text-[#E7A837] text-[25px] mt-3">Price Range</p>
                <div className=" ">
                  <div className="relative inline-block group mt-4 font-thin">
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      className="
            appearance-none 
            bg-transparent 
            text-white 
            text-2xl  
            pr-12 
            focus:outline-none 
            cursor-pointer
            rounded-sm
          "
                    >
                      {cities.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="bg-[#333] text-white"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-white text-xl font-light">
                        {" "}
                        <ChevronDown />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* drop down end */}
            <button className="w-[190px] justify-between pr-1 pl-[38px] items-center flex h-[65px] bg-black border border-[#E7A837] rounded-[75px] text-[#E7A837] text-[20px] font-light transition-all duration-300 hover:bg-[#E7A837] hover:text-black group">
              Search
              <span className="bg-white flex justify-center items-center w-[56px] h-[56px] rounded-full transition-all duration-300 group-hover:bg-black">
                <Search className="group-hover:text-[#E7A837] transition-colors duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* this is the villa section over here !!!!! */}
      <div className=" justify-between gap-4  mb-[125px]  mt-[120px] flex flex-wrap w-[1250px] ">
        <PropertySection title="Villas" data={villas} />
      </div>

      {/* GAllery part of this home page */}
      <div className="flex justify-center">
        <div className="h-[1100px] text-white flex flex-col items-center bg-black w-[1600px] mt-[100px] rounded-[40px] mb-[100px]">
          {/* Heading Section */}
          <div className="flex justify-between items-center w-[1250px] mt-20">
            <p className="text-[65px] font-semibold text-[#E7A837]/30">
              Gallery
            </p>

            <p className="text-[65px] font-semibold text-right">
              Discover our Finest <br /> Project Showcase
            </p>
          </div>

          {/* Slider Section */}
          {loading && <p>loading....</p>}
          {error && <p>{error}</p>}
          <div className="w-[1250px] rounded-[40px]  mt-20">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3000 }}
              loop={true}
              spaceBetween={30}
              slidesPerView={2}
            >
              {properties?.map((property: any) => (
                <SwiperSlide key={property.$id}>
                  <img
                    src={
                      property.image.startsWith("http")
                        ? property.image // use external URL
                        : storage.getFileView(BUCKET_ID, property.image) // use Appwrite file
                    }
                    alt={property.name}
                    className=" rounded-[50px] h-[550px] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            onClick={() => navigate("/gallery")}
            className="mt-[50px] w-[220px] h-[65px] items-center rounded-[72px] justify-between text-[20px] pr-1 pl-10 border-2 border-[#E7A837]  bg-white flex text-[#E7A837]"
          >
            view more{" "}
            <p className="w-[55px]  flex justify-center items-center h-[55px] rounded-full bg-black">
              <MoveUpRight />
            </p>
          </button>
        </div>
      </div>
      {/* this  is the apratments section  here !!!!! */}
      <div className="w-[1250px] h-[100vh]  mb-[125px]">
        <PropertySection title="Apartments" data={apartments} />
      </div>
      {/* this is the bunglow section !!!!!!! */}
      <div className="w-[1250px] h-[100vh] mb-[125px]">
        <PropertySection title="Bungalows" data={bungalows} />
      </div>
    </div>
  );
};

export default Home;
