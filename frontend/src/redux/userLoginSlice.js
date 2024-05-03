import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLoginThunk = createAsyncThunk("userLogin", async (userCred, thunkApi) => {
  let res;
  if (userCred.userType === "user") {
    res = await axios.post("http://localhost:4000/user-api/login",userCred);
    // console.log(res)
  }

  if (userCred.userType === "restaurant") {
    res = await axios.post("http://localhost:4000/client/login", userCred);
    // console.log(res)

  }

  // if login is sucess
  if (res.data.statusCode === 200) {
    sessionStorage.setItem("token", res.data.token);
    if(res.data.user.userType==='restaurant'){
      sessionStorage.setItem('restaurantName',res.data.user.restaurantName)
      sessionStorage.setItem('restaurantId',res.data.user.restaurantId)
    }
    return res.data;
  } else {
    // console.log(res.data)
    return thunkApi.rejectWithValue(res.data);
  }
});

export const userLoginSlice = createSlice({
  name: "user-login-slice",
  initialState: {
    isPending: false,
    currentUser: {},
    errorStatus: false,
    errorMessage: "",
    loginStatus: false,
  },
  reducers: {
    resetState: (state) => {
      state.isPending = false;
      state.currentUser = {};
      state.errorStatus = false;
      state.errorMessage = "";
      state.loginStatus = false;
    },
    setUserLogin: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoginStatus: (state)=>{
      let token = sessionStorage.getItem('token');
      if(!token){
        state.loginStatus = false
      }else{
        state.loginStatus = true
      }
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLoginThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.errorStatus = false;
        state.errorMessage = "";
        state.loginStatus = true;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.errorStatus = true;
        state.errorMessage = action.payload;
        state.loginStatus = false;
      }),
});

//export root reducer of userLoginSlice
export default userLoginSlice.reducer;

//export action creator functions
export const { resetState, setUserLogin,setLoginStatus } = userLoginSlice.actions;
