// 2. Reducer
// otherSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initial state for the other slice
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    // Reducer actions for the other slice
  },
});

export const {
  /* Action creators for the other slice */
} = otherSlice.actions;
export default otherSlice.reducer;
