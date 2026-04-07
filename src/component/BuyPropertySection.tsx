import { useNavigate } from "react-router-dom";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";
import { DollarSign, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AllProperties = ({ data }: any) => {
  const navigate = useNavigate();

 const { isAuthenticated } = useSelector((state: any) => state.auth); // ✅ correct place

  const handleBuy = (property: any) => {
    if (!isAuthenticated) {
      toast.error("Please login first ⚠️");
      return;
    }

    navigate(`/checkout/${property.$id}`);
  };
  return (
    <div className="flex  mt-[150px] flex-col items-center">
      {/* Simple Header */}
      <h1 className="text-2xl font-bold mb-5">All Properties</h1>

      {/* Properties */}
      <div className="max-w-[1400px] w-full flex flex-wrap justify-center gap-6">
        {data.map((property: any) => (
          <div
            key={property.$id}
            className="w-full sm:w-[48%] md:w-[30%] border border-[#E7A837] p-3 rounded"
          >
            <img
              src={
                property.image.startsWith("http")
                  ? property.image
                  : storage.getFileView(BUCKET_ID, property.image)
              }
              className="w-full h-[180px] object-cover rounded"
            />
            <div className="flex justify-between">
              <div>
                <p className="font-semibold mt-2 mb-2">{property.name}</p>
                <p className="text-sm flex gap-2 mb-2 text-gray-500">
                  <MapPin color="red" size={18} />
                  {property.location.toUpperCase()}
                </p>
              </div>
              <div>
              <p className="font-semibold mt-2 mb-2">{property.type.toUpperCase()}</p>
                <p className="text-sm flex gap-2 mb-2 text-gray-500">
                  <DollarSign color="green" size={18} />
                  {property.price.toUpperCase()}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleBuy(property)}
              className="
    mt-3 w-full border border-[#E7A837] py-1 rounded 
    text-[#E7A837] 
    hover:bg-[#E7A837] hover:text-black 
    transition-all duration-300
  "
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Empty */}
      {data.length === 0 && (
        <p className="mt-5 text-gray-500">No properties found</p>
      )}
    </div>
  );
};

export default AllProperties;
