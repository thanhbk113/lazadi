import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Products } from "../share/type";
import { herokuApi } from "../api/herokuApi";

interface InitialState {
  products: Products[] | null;
  loading: boolean;
}

const initialState: InitialState = {
  products: null,
  loading: false,
};

export const fetchProductsApiFitler = createAsyncThunk(
  "products/fetchproductsApiFitler",
  async (nameCategory: string, thunkApi) => {
    const response = await herokuApi.getProductFitler(nameCategory);
    return response.data;
  }
);

export const fetchProductsApi = createAsyncThunk(
  "products/fetchProductsApi",
  async (thunkAPI) => {
    const response = await herokuApi.getProduct();
    return response.data;
  }
);

const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsApi.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductsApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsApiFitler.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductsApiFitler.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default productSlice.reducer;
