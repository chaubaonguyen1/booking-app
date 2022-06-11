import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_START: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => { 
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    LOGIN_FAILURE: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    LOG_OUT: (state) => {
      state.user = null;
    }
  }
});
export const { LOGIN_START, LOGIN_FAILURE, LOGIN_SUCCESS, LOG_OUT } = authSlice.actions;
export default authSlice.reducer;