import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurantThunk = createAsyncThunk(
  "fetch-restaurants",
  async (unuser_arg, thunkApi) => {
    let res = await axios.get("http://localhost:4000/user-api/all-restaurants");
    console.log(res.data);

    if (res.data.statusCode === 12) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.data);
    }
  }
);

export const fetchMenuOfRestaurantThunk = createAsyncThunk(
  "fetch-restaurants-menu",
  async (restaurantObj, thunkApi) => {
    let restaurantId = restaurantObj.restaurantId;
    console.log(restaurantId)
    let res = await axios.get(`http://localhost:4000/user-api/menu/${restaurantId}`);
    console.log(res.data);

    if (res.data.statusCode === 14) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.data);
    }
  }
);

export const foodOrderSlice = createSlice({
  name: "foodOrderSlice",
  initialState: {
    isPending: false,
    errorStatus: false,
    errorMessage: "",
    restaurantList: [],
    restaurantMenuList: [],
    cartItems: {},
  },
  reducers: {
    resetState: (state) => {
      state.isPending = false;
      state.errorStatus = false;
      state.errorMessage = "";
      state.restaurantList = [];
      state.restaurantMenuList = [];
      state.cartItems = {};
    },

    addToCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] > 0) {
        state.cartItems[itemId] -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantThunk.pending, (state) => {
        state.isPending = true;
        state.errorMessage = "";
        state.errorStatus = false;
        state.restaurantList = [];
        state.cartItems = {};
      })
      .addCase(fetchRestaurantThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.restaurantList = action.payload.payload;
        state.errorMessage = "";
        state.errorStatus = false;
      })
      .addCase(fetchRestaurantThunk.rejected, (state, action) => {
        state.isPending = false;
        state.errorStatus = true;
        state.errorMessage = action.error.message;
        state.restaurantList = [];
        state.restaurantMenuList = [];
      })
      .addCase(fetchMenuOfRestaurantThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchMenuOfRestaurantThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.restaurantMenuList = action.payload;
      })
      .addCase(fetchMenuOfRestaurantThunk.rejected, (state, action) => {
        state.isPending = false;
        state.errorStatus = true;
        state.errorMessage = action.error.message;
      });
  }
});

export default foodOrderSlice.reducer;
export const { resetState } = foodOrderSlice.reducer;
