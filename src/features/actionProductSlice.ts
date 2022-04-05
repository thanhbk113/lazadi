import { ProductsAction, buyProduct } from "../share/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { herokuApi } from "../api/herokuApi";

interface InitialState {
  loading: boolean;
}

const initialState: InitialState = {
  loading: false,
};

export const addProductsApi = createAsyncThunk(
  "productActions/addProductsApi",
  async (p: ProductsAction) => {
    await herokuApi.addProduct(p.category, p.description, p.imgUrl, p.price);
  }
);

export const deleteProductsApi = createAsyncThunk(
  "productActions/deleteProductsApi",
  async (id: number) => {
    await herokuApi.deleteProduct(id);
  }
);
export const editProductsApi = createAsyncThunk(
  "productActions/editProductsApi",
  async (p: ProductsAction) => {
    await herokuApi.editProduct(
      p.id,
      p.category,
      p.description,
      p.imgUrl,
      p.price
    );
  }
);

export const buyProductsApi = createAsyncThunk(
  "productActions/buyProductsApi",
  async (p: buyProduct) => {
    await herokuApi.buyProducts(
      p.customerName,
      p.phoneNumber,
      p.addressCustomer,
      p.productBuy,
      p.totalProducts,
      p.totalMoney
    );
  }
);

const actionProductsSlice = createSlice({
  initialState,
  name: "productActions",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductsApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addProductsApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProductsApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProductsApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editProductsApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editProductsApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buyProductsApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(buyProductsApi.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default actionProductsSlice.reducer;
