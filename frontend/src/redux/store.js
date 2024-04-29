import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLoginSlice";
import userOrderSlice from "./userOrderSlice";
export const reduxStore = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userOrder: userOrderSlice
  },
});
