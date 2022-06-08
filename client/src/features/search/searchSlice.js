import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    OPTIONS: (state, action) => {
      state.options = action.payload
    },
    DATE: (state, action) => {
      state.dates = action.payload
    },
    DESTINATION: (state,action) => {
      state.city = action.payload
    },
    RESET_SEARCH: (state) => {
      return state = {
        city: undefined,
        date: [],
        options: {
          adult: undefined,
          children: undefined,
          room: undefined,
        },
      };
    },
  },
});

export const { OPTIONS, DATE, DESTINATION, RESET_SEARCH } = searchSlice.actions;

export default searchSlice.reducer;