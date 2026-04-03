import { useNavigate } from "react-router-dom";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";

const AllProperties = ({ data }: any) => {
  const navigate = useNavigate();
  const handleBuy = (property: any) => {
    navigate(`/checkout/${property.$id}`);
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="max-w-[1600px] w-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-5xl font-semibold leading-tight">
            Explore All <br />
            <span className="text-[#E7A837]">Properties</span>
          </h1>
          <p className="text-5xl text-gray-300 font-semibold">All</p>
        </div>

        <div className="flex flex-wrap gap-5">
          {data.map((property: any) => (
            <div
              key={property.$id}
              className="
                w-full 
                sm:w-[48%] 
                md:w-[31%] 
                lg:w-[23%]
                border border-[#E7A837] 
                rounded-2xl 
                overflow-hidden 
                flex flex-col 
                hover:shadow-xl 
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
                className="h-[230px] w-full object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <p className="font-bold text-lg">{property.name}</p>

                  <p className="text-sm text-gray-600 mt-1">
                    📍 {property.location}
                  </p>

                  <p className="mt-2 font-semibold text-[#E7A837]">
                    ₹ {property.price}
                  </p>

                  <p className="text-sm mt-2 line-clamp-2 text-gray-500">
                    {property.description}
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleBuy(property)}
                  className="mt-4 w-full h-[45px] rounded-full border border-[#E7A837] text-[#E7A837] font-semibold hover:bg-[#E7A837] hover:text-black transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center mt-20 text-gray-500 text-xl">
            No properties found 😔
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
