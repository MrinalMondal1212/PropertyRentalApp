import { createSlice } from "@reduxjs/toolkit";
import {
  addProperty,
  deletePropertyFromDB,
  productsList,
} from "./adminproducts.thunk";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  type: string;
  location: string;
  image: string;
}

interface AdminProductsState {
  properties: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminProductsState = {
  properties: [],
  loading: false,
  error: null,
};

const adminproductsSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ FETCH
      .addCase(productsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productsList.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(productsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ DELETE
      .addCase(deletePropertyFromDB.fulfilled, (state, action) => {
        state.properties = state.properties.filter(
          (property) => property.id !== action.payload
        );
      })

      // ✅ ADD
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminproductsSlice.reducer;