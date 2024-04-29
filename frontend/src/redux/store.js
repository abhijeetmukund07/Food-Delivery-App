import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLoginSlice";
import userOrderSlice from "./userOrderSlice";
import foodOrderSlice from "./foodOrderSlice";
export const reduxStore = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userOrder: userOrderSlice,
    foodOrder: foodOrderSlice
  },
});
