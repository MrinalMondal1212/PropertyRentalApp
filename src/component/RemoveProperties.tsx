// import React from 'react'
// import React from 'react'
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage, BUCKET_ID } from "../lib/appwriteConfig";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


import {
  deletePropertyFromDB,
  productsList,
} from "../store/adminproducts/adminproducts.thunk";
import toast from "react-hot-toast";


// import toast from "react-hot-toast";
// import { BUCKET_ID, storage } from "../appwrite/appwriteConfig";
const RemoveProperties = () => {
  const { properties, loading, error } = useSelector(
    (state: any) => state.adminproducts,
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);
  
  // this is the delete function is here !!!!

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deletePropertyFromDB(id)).unwrap();
      toast.success("Property deleted successfully ✅");
    } catch (error) {
      toast.error("Failed to delete property ❌");
    }
  };

  return (
    <>
      {/* ! carousel is here !!!!!! */}
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {error && <p>{error}</p>}
      <div className=" flex justify-center  mt-[45px] ">
        <div className="flex flex-wrap justify-center gap-6">
          {properties?.map((property: any) => {
            console.log(property.image);
            return (
              <div
                className="w-[700px] border border-[#FFA400] flex mb-5 rounded-xl overflow-hidden h-[250px]"
                key={property.$id}
              >
                {/* Image Section */}
                <div className="w-[300px] h-full flex-shrink-0">
                  <img
                    src={
                      property.image.startsWith("http")
                        ? property.image
                        : storage.getFileView(BUCKET_ID, property.image)
                    }
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Data Section */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold mb-1">
                      Name: {property.name}
                    </p>
                    <p className="text-lg mb-1">Price: {property.price}</p>
                    <p className="text-lg mb-1">
                      Location: {property.location}
                    </p>
                    <p className="text-lg mb-1">Type: {property.type}</p>
                    <p className="text-sm text-gray-600">
                      Description: {property.description}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleDelete(property.$id)}
                      className="bg-black w-[100px] text-white px-4 py-2 rounded-lg hover:bg-red-500 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RemoveProperties;
