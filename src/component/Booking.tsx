// import React from 'react'
import { account } from "../lib/appwriteConfig";
import { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  BOOKINGS_COLLECTION_ID,
  BUCKET_ID,
  storage,
} from "../lib/appwriteConfig";

const Booking = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getBookings = async () => {
    try {
      const user = await account.get();

      const res = await databases.listDocuments(
        DATABASE_ID,
        BOOKINGS_COLLECTION_ID,
      );

      const userBookings = res.documents.filter(
        (item: any) => item.userId === user.$id,
      );

      setBookings(userBookings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading bookings...</div>;
  }

  return (
    <div className="flex justify-center mt-10 mb-[100px] px-4">
      <div className="max-w-[1200px] w-full">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8">All Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found 😔</p>
        ) : (
          <div className="flex flex-col gap-5">
            {bookings.map((item: any) => (
              <div
                key={item.$id}
                className="flex gap-4 border border-[#E7A837] p-4 rounded-xl shadow hover:shadow-lg transition-all"
              >
                {/*  Image */}
                <img
                  src={
                    item.propertyImage
                      ? item.propertyImage.startsWith("http")
                        ? item.propertyImage
                        : storage.getFileView(BUCKET_ID, item.propertyImage)
                      : "https://via.placeholder.com/150"
                  }
                  className="w-[120px] h-[100px] object-cover rounded-lg"
                />

                {/*  Details */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <p className="font-semibold text-lg">{item.propertyName}</p>

                    <p className="text-gray-600">Amount: ₹{item.amount}</p>

                    <p className="text-sm text-gray-500">
                      Payment ID: {item.paymentId}
                    </p>

                    <p className="text-sm text-gray-500">User: {item.userId}</p>
                  </div>

                  {/* Status */}
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

export default Booking;
