import { Navigation } from "swiper/modules";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PropertySection = ({ title, data }: any) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const handleBuy = (property: any) => {
    if (!isAuthenticated) {
      toast.error("Please login first ⚠️");
      return;
    }

    navigate(`/checkout/${property.$id}`);
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto mt-12 px-4">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-bold">
          Explore <span className="text-[#E7A837]">Properties</span>
        </h2>
        <p className="text-2xl text-gray-400 font-semibold">{title}</p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        loop={true}
      >
        {data.map((property: any) => (
          <SwiperSlide key={property.$id}>
            <div
              className="
                border border-gray-200 
                rounded-xl 
                overflow-hidden 
                hover:shadow-lg 
                transition-all duration-300
              "
            >
              {/* Image */}
              <img
                src={
                  property.image.startsWith("http")
                    ? property.image
                    : storage.getFileView(BUCKET_ID, property.image)
                }
                className="h-[360px] w-full object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-[200px]">
                <div>
                  <p className="font-semibold text-lg">{property.name}</p>

                  <p className="text-sm text-gray-500 mt-1">
                    📍 {property.location}
                  </p>

                  <p className="text-[#E7A837] font-semibold mt-1">
                    ₹ {property.price}
                  </p>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {property.description}
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleBuy(property)}
                  className="
                    mt-3 w-full h-[45px] 
                    border border-[#E7A837] 
                    text-[#E7A837] 
                    rounded-lg 
                    hover:bg-[#E7A837] hover:text-black 
                    transition-all duration-300
                  "
                >
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
