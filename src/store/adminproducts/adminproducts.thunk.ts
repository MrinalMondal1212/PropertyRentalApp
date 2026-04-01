import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  PROPERTIES_COLLECTION_ID,
  storage,
} from "../../lib/appwriteConfig";
import { ID } from "appwrite";

// ✅ GET ALL PRODUCTS
export const productsList = createAsyncThunk(
  "properties/productsList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PROPERTIES_COLLECTION_ID,
      );

      // ✅ IMPORTANT: Convert Appwrite data → your format
      return response.documents.map((doc: any) => ({
        $id: doc.$id,
        name: doc.Name,
        description: doc.Description,
        price: doc.Price,
        type: doc.Type,
        location: doc.Location,
        image: doc.image,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// ✅ DELETE PROPERTY
export const deletePropertyFromDB = createAsyncThunk(
  "properties/deleteProperty",
  async (id: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, PROPERTIES_COLLECTION_ID, id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// ✅ ADD PROPERTY
export const addProperty = createAsyncThunk(
  "properties/addProperty",
  async ({ formData, imageFile }: any, { rejectWithValue }) => {
    try {
      const uploadedFile = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        imageFile,
      );

      const response = await databases.createDocument(
        DATABASE_ID,
        PROPERTIES_COLLECTION_ID,
        ID.unique(),
        {
          Name: formData.name,
          Price: formData.price,
          Location: formData.location,
          Description: formData.description,
          Type: formData.type,
          image: uploadedFile.$id,
        },
      );

      // ✅ Convert response → your format
      return {
        $id: response.$id,
        name: response.Name,
        description: response.Description,
        price: response.Price,
        type: response.Type,
        location: response.Location,
        image: response.image,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);