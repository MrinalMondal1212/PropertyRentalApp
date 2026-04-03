// import React from 'react'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

import { productsList } from "../store/adminproducts/adminproducts.thunk";
import { storage, BUCKET_ID } from "../lib/appwriteConfig";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();

  const { properties } = useSelector((state: any) => state.adminproducts);

  useEffect(() => {
    window.scrollTo({
      top : 0,
      behavior : "smooth"
    })
    dispatch(productsList());
  }, [dispatch]);

  return (
    <div className="flex justify-center mt-[90px] bg-[#F5F7FB]">
    <div className="max-w-[1600px] w-full px-10 py-10 mt-4  bg-[#F5F7FB]">
      {/* <h2 className="text-3xl font-bold mb-6 mt-6 text-center">Property Gallery</h2> */}

      <Swiper
        modules={[Autoplay, Grid]}
        spaceBetween={20}
        slidesPerView={4}
        grid={{
          rows: 2, // 🔥 this creates bottom row
          fill: "row",
        }}
        loop={true}
        speed={1200} // smooth animation
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {properties?.map((property: any) => (
          <SwiperSlide key={property.id}>
            <div   onClick={()=> navigate("/properties")} className="relative group rounded-2xl overflow-hidden shadow-lg">
              {/* Image */}
              <img
            
                src={
                  property.image.startsWith("http")
                    ? property.image
                    : storage.getFileView(BUCKET_ID, property.image)
                }
              
                className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-500">
                <p className="text-white text-lg font-bold">{property.name}</p>
                <p className="text-yellow-400 capitalize">{property.type}</p>
              </div>

              {/* Always visible type badge */}
              <div className="absolute top-3 left-3 bg-[#FFA400] text-black px-3 py-1 rounded-full text-sm font-semibold capitalize">
                {property.type}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default Gallery;
