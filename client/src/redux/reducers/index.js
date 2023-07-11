// import otherReducer from "./otherReducer";
import dataReducer from "./csvData";

import { combineReducers } from "@reduxjs/toolkit";

const allReducers = combineReducers({
  // other: otherReducer,
  data: dataReducer,
});

export default allReducers;
