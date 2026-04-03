import { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  BOOKINGS_COLLECTION_ID,
  BUCKET_ID,
  storage,
} from "../lib/appwriteConfig";

const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
      );

      // 🔥 Filter for current user (for now demoUser)
      const userOrders = res.documents.filter(
        (item: any) => item.userId === "demoUser",
      );

      setOrders(userOrders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading orders...</div>;
  }

  return (
    <div className="flex justify-center mt-16 px-4">
      <div className="max-w-[1000px] w-full">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8">My Purchases</h1>

        {/* Empty State */}
        {orders.length === 0 ? (
          <p className="text-gray-500 text-lg">No purchases yet 😔</p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((item: any) => (
              <div
                key={item.$id}
                className="flex gap-4 border border-[#E7A837] p-4 rounded-xl shadow hover:shadow-lg transition-all"
              >
                {/* 🖼️ Image */}
                <img
                  src={
                    item.propertyImage
                      ? item.propertyImage.startsWith("http")
                        ? item.propertyImage
                        : storage.getFileView(BUCKET_ID, item.propertyImage)
                      : "https://via.placeholder.com/150" // fallback image
                  }
                  className="w-[120px] h-[100px] object-cover rounded-lg"
                />

                {/* 📦 Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-lg">{item.propertyName}</p>

                    <p className="text-gray-600">Amount: ₹{item.amount}</p>

                    <p className="text-sm text-gray-500">
                      Payment ID: {item.paymentId}
                    </p>
                  </div>

                  {/* ✅ Status */}
                  <span className="text-green-600 font-semibold">
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
