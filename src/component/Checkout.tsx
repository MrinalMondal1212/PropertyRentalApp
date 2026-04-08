import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import { ID } from "appwrite";
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

  //  PAYMENT HANDLER
  // ✅ add this import

 const handlePayment = async () => {
  try {
    setLoading(true);

    // 1. Get User
    const user = await account.get();

    // 2. Duplicate Check (Requires Indexes on userId and propertyId in Appwrite)
    const existing = await databases.listDocuments(
      DATABASE_ID,
      BOOKINGS_COLLECTION_ID,
      [
        Query.equal("userId", user.$id),
        Query.equal("propertyId", property.$id),
      ],
    );

    if (existing.documents.length > 0) {
      toast.error("You already purchased this property ⚠️");
      setLoading(false);
      return;
    }

    // 3. Dynamic Amount Calculation
    // We strip everything except numbers and decimals to prevent NaN errors
    const numericPrice = Number(property.price.toString().replace(/[^0-9.]/g, ""));
    const finalAmount = Math.round(numericPrice * 100); 

    // Validation to prevent 400 errors
    if (isNaN(finalAmount) || finalAmount <= 0) {
      toast.error("Invalid property price detection ❌");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_Sadk3iHvflmlxw",
      amount: finalAmount, // Dynamic amount in paise
      currency: "INR",
      name: "Rental App",
      description: property.name,
      handler: async function (response: any) {
        try {
          await databases.createDocument(
            DATABASE_ID,
            BOOKINGS_COLLECTION_ID,
            ID.unique(),
            {
              userId: user.$id,
              propertyId: property.$id,
              propertyName: property.name,
              propertyImage: property.image,
              amount: property.price.toString(), // Store original price
              paymentId: response.razorpay_payment_id,
              status: "paid",
            },
          );
          toast.success("Payment Successful ✅");
          navigate("/myorders");
        } catch (err) {
          console.error("Appwrite DB Error:", err);
          toast.error("Database sync failed ❌");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: user.name || "User",
        email: user.email || "user@example.com",
        contact: "9999999999", // Helps prevent "International" card flags
      },
      theme: {
        color: "#E7A837",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response: any) {
      console.error("Payment Failed Reason:", response.error.description);
      toast.error("Payment Failed ❌");
      setLoading(false);
    });

  } catch (err) {
    toast.error("Initialization failed ❌");
    console.error("Payment Error:", err);
    setLoading(false);
  }
};

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
          <p className="text-lg flex gap-1 mt-1">
            <DollarSign color="green" /> {property.price}
          </p>
          <p className="mt-1 text-lg flex gap-1 text-gray-600">
            <MapPin color="red" />
            {property.location}
          </p>
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
