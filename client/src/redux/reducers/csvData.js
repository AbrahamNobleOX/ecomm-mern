// reducers.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: [],
  },
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  dataSlice.actions;
export default dataSlice.reducer;

export const selectData = (state) => state.allReducers.data.data.csvData;

export const selectStatus = (state) => state.allReducers.data;
