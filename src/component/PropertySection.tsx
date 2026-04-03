// import "swiper/css";
// import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

const PropertySection = ({ title, data }: any) => {
  const navigate = useNavigate();
  const handleBuy = (property: any) => {
    navigate(`/checkout/${property.$id}`);
  };

  return (
    <div className="w-[1250px] mt-10 ">
      <div className=" flex justify-between tracking-tighter leading-none">
        <p className="font-semibold text-[65px]">
          Check On All <br /> <span className="text-[#FFC358]">Properties</span>
        </p>
        <div className="flex items-end text-[65px] font-semibold text-[#0000004D]/30">
          <p>{title}</p>
        </div>
      </div>
      {/* <p className="text-4xl font-semibold mb-6">{title}</p> */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        loop={true}
        className="mt-[45px]"
      >
        {data.map((property: any) => (
          <SwiperSlide key={property.$id}>
            <div className=" border border-[#E7A837] p-3 rounded-2xl overflow-hidden">
              <img
                src={
                  property.image.startsWith("http")
                    ? property.image
                    : storage.getFileView(BUCKET_ID, property.image)
                }
                className="h-[450px] w-full rounded-xl  object-cover"
              />

              <div className="p-3">
                <p className="font-bold">{property.name}</p>
                <p>
                  <span>Price : </span>
                  {property.price}
                </p>
                <p>
                  <span>Location : </span>
                  {property.location}
                </p>
                <p>
                  <span>Description : </span>
                  {property.description}
                </p>
                <button onClick={()=> handleBuy(property)} className="w-[190px] justify-center mt-[25px] font-semibold  items-center flex h-[65px] bg-black border border-[#E7A837] rounded-[75px] text-[#E7A837] text-[20px] transition-all duration-300 hover:bg-[#E7A837] hover:text-black group">
                  Buy Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default PropertySection;
