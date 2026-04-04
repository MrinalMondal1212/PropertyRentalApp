import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";

const SearchView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { properties } = useSelector((state: any) => state.adminproducts);

  const { location, type } = state || {};

  const filteredData = properties.filter((item: any) => {
    return (
      (!location ||
        item.location.toLowerCase().includes(location.toLowerCase())) &&
      (!type || item.type.toLowerCase() === type.toLowerCase())
    );
  });

  return (
    <div className="mt-[150px] flex justify-center px-4">
      <div className="max-w-[1400px] w-full">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>

        {filteredData.length === 0 ? (
          <p>No properties found 😔</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {filteredData.map((item: any) => (
              <div
                key={item.$id}
                className="
                  w-full sm:w-[48%] md:w-[31%] lg:w-[23%]
                  border border-gray-200 
                  rounded-2xl 
                  overflow-hidden 
                  shadow-sm 
                  hover:shadow-lg 
                  transition-all duration-300
                "
              >
                {/* Image */}
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : storage.getFileView(BUCKET_ID, item.image)
                  }
                  className="w-full h-[220px] object-cover"
                />

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-[220px]">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {item.location}
                    </p>

                    <p className="text-[#E7A837] font-semibold mt-2">
                      ₹ {item.price}
                    </p>

                    {/* Dotted description */}
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/checkout/${item.$id}`)}
                    className="
                      mt-4 w-full h-[45px] 
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;