import { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  BOOKINGS_COLLECTION_ID,
  BUCKET_ID,
  storage,
} from "../lib/appwriteConfig";
import { account } from "../lib/appwriteConfig";
import { Query } from "appwrite";

const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const user = await account.get();

      const res = await databases.listDocuments(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
        [
          Query.equal("userId", user.$id),
          Query.orderDesc("$createdAt")
        ]
      );

      setOrders(res.documents);
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
    return (
      <div className="flex justify-center items-center mt-40 text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-[150px] px-4">
      <div className="max-w-[900px] w-full">
        
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">My Purchases</h1>

        {/* Empty */}
        {orders.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg">No purchases yet 😔</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((item: any) => (
              <div
                key={item.$id}
                className="
                  flex gap-4 
                  border border-gray-200 
                  rounded-xl 
                  p-4 
                  hover:shadow-md 
                  transition-all duration-300
                "
              >
                {/* Image */}
                <img
                  src={
                    item.propertyImage
                      ? item.propertyImage.startsWith("http")
                        ? item.propertyImage
                        : storage.getFileView(BUCKET_ID, item.propertyImage)
                      : "https://via.placeholder.com/150"
                  }
                  className="w-[270px] h-[230px] object-cover rounded-lg"
                />

                {/* Details */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <p className="font-semibold text-lg">
                      {item.propertyName}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Payment ID: {item.paymentId}
                    </p>

                    <p className="text-[#E7A837] font-semibold mt-2">
                      ₹ {item.amount}
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex justify-between items-center mt-2">
                    {/* Status Badge */}
                    <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                      {item.status}
                    </span>
                  </div>
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