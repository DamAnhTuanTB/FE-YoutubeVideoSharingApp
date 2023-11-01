import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (body) => {
    const data = await authService.getProfile();
    return data?.data;
  }
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    count: 0,
    total: 0,
    loading: "",
    error: "",
    userData: {},
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "rejected";
        // state.error = action.error.message;
      });
  },
});

export const { increment, decrement } = appSlice.actions;
export default appSlice.reducer;
