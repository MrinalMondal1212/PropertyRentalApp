import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";
import { useEffect, useState } from "react";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import { fakeRazorpay } from "../utils/fakePayment";
import { databases } from "../lib/appwriteConfig";
import { account } from "../lib/appwriteConfig";
import { DATABASE_ID, BOOKINGS_COLLECTION_ID } from "../lib/appwriteConfig";
import type { AppDispatch } from "../store/adminproducts/adminproductsSlice";
import toast from "react-hot-toast";
import { DollarSign, MapPin } from "lucide-react";

const Checkout = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { properties } = useSelector((state: any) => state.adminproducts);

  const property = properties.find((p: any) => p.$id === id);

  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  if (!property) {
    return <p className="text-center mt-10">Property not found</p>;
  }

  // 🚀 PAYMENT HANDLER
  const handlePayment = async () => {
    try {
      setLoading(true);

      const user = await account.get(); // already protected

      const res: any = await fakeRazorpay(property.price);

      await databases.createDocument(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        "unique()",
        {
          userId: user.$id,
          propertyId: property.$id,
          propertyName: property.name,
          propertyImage: property.image,
          amount: property.price,
          paymentId: res.paymentId,
          status: "paid",
        },
      );

      toast.success("Payment Successful ✅");
      navigate("/myorders");
    } catch (err) {
      toast.error("Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get(); // ✅ if logged in → OK
      } catch {
        toast.error("Please login first 🔐");
        navigate("/login");
      }
    };

    checkUser();
  }, []);

 return (
  <div className="flex justify-center mt-[150px] px-4">
    <div className="w-full max-w-[700px] border p-4 rounded-xl shadow-md">
      
      {/* Image */}
      <img
        src={
          property.image.startsWith("http")
            ? property.image
            : storage.getFileView(BUCKET_ID, property.image)
        }
        className="w-full h-[260px] object-cover rounded-lg"
      />

      {/* Details */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{property.name}</h1>
        <p className="text-lg flex gap-1 mt-1"><DollarSign color="green"/> {property.price}</p>
        <p className="mt-1 text-lg flex gap-1 text-gray-600"><MapPin color="red"/>{property.location}</p>
        <p className="mt-1 text-sm">{property.type}</p>
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">
          {property.description}
        </p>
      </div>

      {/* Payment */}
      <div className="mt-5 border-t pt-3">
        <h2 className="text-xl font-semibold">Total: ₹ {property.price}</h2>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="
            mt-4 w-full h-[50px] 
            border border-[#E7A837] 
            text-[#E7A837] 
            rounded-lg 
            hover:bg-[#E7A837] hover:text-black 
            transition-all duration-300 
            disabled:opacity-50
          "
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  </div>
);
};

export default Checkout;
