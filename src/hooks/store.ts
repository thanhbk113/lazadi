import actionProductReducer from "../features/actionProductSlice";
import authReducer from "../features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    productActions: actionProductReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
