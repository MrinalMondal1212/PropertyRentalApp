// import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { storage, BUCKET_ID } from "../lib/appwriteConfig";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  addProperty,
  deletePropertyFromDB,
  productsList,
} from "../store/adminproducts/adminproducts.thunk";
import toast from "react-hot-toast";
// import { deleteProperty } from "../store/adminproducts/adminproductsSlice";
// import toast from "react-hot-toast";
// import { BUCKET_ID, storage } from "../appwrite/appwriteConfig";
const Addproperties = () => {
  const { properties, loading, error } = useSelector(
    (state: any) => state.adminproducts,
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);
  const [open, setOpen] = useState(false);

  // function for form submission
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    location: "",
    description: "",
    type: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    await dispatch(addProperty({ formData, imageFile }));
    // toast.success('Property added successfully!');

    dispatch(productsList()); // refresh
    handleClose();
  };
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      {/* this is the dialog box  */}
      <div className="flex justify-center mt-[30px]">
        <Button
          sx={{
            width: "500px",
            height: "50px",
            borderRadius: "30px",
            fontSize: "23px",
          }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add New Properties
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>List Properties</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: "24px" }}>
              To add property to this website, please enter the name , price ,
              description, location, type of the property here. We will send
              updates occasionally.
            </DialogContentText>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                name="name"
                label="Property Name"
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: "24px" }}
              />

              <TextField
                name="price"
                label="Price"
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: "24px" }}
              />
              <TextField
                name="location"
                label="location"
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: "24px" }}
              />

              <TextField
                name="description"
                label="description"
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: "24px" }}
              />
              <TextField
                name="type"
                label="Property type"
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: "24px" }}
              />

              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
              </Button>

              {/* Show selected file name */}
              {imageFile && (
                <p style={{ marginTop: "10px" }}>{imageFile.name}</p>
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="subscription-form">
              add.
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* ! carousel is here !!!!!! */}
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {error && <p>{error}</p>}
      <div className=" flex justify-center mt-[45px] ">
        <div>
          {properties?.map((property: any) => {
            console.log(property.image);
            return (
              <div
                className="w-[900px] border border-[#FFA400] flex mb-5 rounded-xl overflow-hidden h-[250px]"
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
                    <p className="text-lg mb-1">Type: {property.Type}</p>
                    <p className="text-sm text-gray-600">
                      Description: {property.description}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button className="bg-black w-[100px] text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.$id)}
                      className="bg-black w-[100px] text-white px-4 py-2 rounded-lg"
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

export default Addproperties;
