import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";
import { useEffect, useState } from "react";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import { fakeRazorpay } from "../utils/fakePayment";
import { databases } from "../lib/appwriteConfig";
import {
  DATABASE_ID,
  BOOKINGS_COLLECTION_ID,
} from "../lib/appwriteConfig";
import type { AppDispatch } from "../store/adminproducts/adminproductsSlice";

const Checkout = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

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

      // Fake Razorpay
      const res: any = await fakeRazorpay(property.price);

      // Save booking in Appwrite
      await databases.createDocument(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        "unique()",
        {
          userId: "demoUser", // later replace with real user
          propertyId: property.$id,
          propertyName: property.name,
          amount: property.price,
          paymentId: res.paymentId,
          status: "paid",
           propertyImage: property.image, 
        }
      );

      alert("Payment Successful ✅");
      navigate("/myorders")
    } catch (err) {
      console.log(err);
      alert("Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-[120px] px-4">
      <div className="w-full max-w-[900px] border p-5 rounded-xl shadow-lg">
        
        {/* Image */}
        <img
          src={
            property.image.startsWith("http")
              ? property.image
              : storage.getFileView(BUCKET_ID, property.image)
          }
          className="w-full h-[400px] object-cover rounded-xl"
        />

        {/* Details */}
        <div className="mt-5">
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <p className="text-xl mt-2">Price: ₹{property.price}</p>
          <p className="mt-2">Location: {property.location}</p>
          <p className="mt-2">Type: {property.type}</p>
          <p className="mt-2 text-gray-600">{property.description}</p>
        </div>

        {/* Payment Section */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-2xl font-semibold">
            Total: ₹{property.price}
          </h2>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-5 w-full h-[60px] bg-black text-white rounded-xl hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;