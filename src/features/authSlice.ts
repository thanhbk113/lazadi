import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  imageUrl: string;
  familyName: string;
}

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
