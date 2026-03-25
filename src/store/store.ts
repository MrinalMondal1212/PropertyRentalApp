import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminproductReducer from "./adminproducts/adminproductsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminproducts : adminproductReducer,
  },
});