UserLoginSclice.js


import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

export const userLoginThunk = createAsyncThunk('userLogin',async(userCred,thunkApi)=>{
    let res;
    if(userCred.userType === 'user'){
        res = axios.post('http://localhost:4000/user-api/login',userCred)
    }

    if(userCred.userType === 'restaurant'){
        res =  axios.post('http://localhost:4000/client/login',userCred)
    }

    // if login is sucess
    if(res.data.statusCode===8){
        sessionStorage.setItem('token',res.data.token)
        return res.data
    }else{
        return thunkApi.rejectWithValue(res.data)
    }
})

export const userLoginSlice =createSlice({
    name:'user-login-slice',
    initialState:{isPending:false,currentUser:{},errorStatus:false,errorMessage:"",loginStatus:false},
    reducers:{
        resetState: (state)=>{
            state.isPending = false;
            state.currentUser = {};
            state.errorStatus = false;
            state.errorMessage = "";
            state.loginStatus = false;
        }
    },
    extraReducers:(builder)=>builder
    .addCase()
})

//export root reducer of userLoginSlice
export default userLoginSlice.reducer;

//export action creator functions
export const {resetState} = userLoginSlice.actions; 