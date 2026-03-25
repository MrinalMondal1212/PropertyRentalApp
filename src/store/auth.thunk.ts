import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  account,
  databases,
  DATABASE_ID,
  USERS_COLLECTION_ID,
} from "../lib/appwriteConfig";
import { ID, Query } from "appwrite";

// TYPES
export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

// ✅ REGISTER (AUTO LOGIN)
export const registerUser = createAsyncThunk<
  any,
  RegisterData,
  { rejectValue: string }
>("auth/registerUser", async (data, thunkAPI) => {
  try {
    const user = await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.name,
    );

    await account.createEmailPasswordSession(data.email, data.password);

    await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        name: data.name,
        email: data.email,
        role: "user",
      },
    );

    const response = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("userId", user.$id)],
    );

    return response.documents[0];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ✅ LOGIN
export const loginUser = createAsyncThunk<
  any,
  LoginData,
  { rejectValue: string }
>("auth/loginUser", async (data, thunkAPI) => {
  try {
    await account.createEmailPasswordSession(data.email, data.password);

    const authUser = await account.get();

    const response = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("userId", authUser.$id)],
    );

    if (response.documents.length === 0) {
      throw new Error("User not found");
    }

    return response.documents[0];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
