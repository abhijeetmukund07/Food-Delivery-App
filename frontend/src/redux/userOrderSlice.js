// userOrderSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { food_list } from '../assets/frontend_assets/assets';

export const userOrderSlice = createSlice({
    name:'user-order-slice',
    initialState: {
        isPending: true,
        cartItems: {},
        staticFoodList: food_list
    },
    reducers:{
        resetState: (state) => { 
            state.isPending = true;
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
        }
    }
});

export default userOrderSlice.reducer;
export const { resetState, addToCart, removeFromCart } = userOrderSlice.actions;









// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {food_list} from '../assets/frontend_assets/assets'
// import axios from "axios";

// export const userOrderSlice = createSlice({
//     name:'user-order-slice',
//     initialState: {
//         isPending: true, //since menu_items are retrived on load
//         cartItems: {},
//         staticFoodList : food_list
//     },
//     // might need to completely remove this and add new reducers
//     reducers:{
//         resetState:(state)=>{ 
//             state.isPending = true
//             state.cartItems = {}
//         },

//         addToCart:(state,itemId)=>{
//             if(!state.cartItems[itemId]){
//                 state.cartItems = state.cartItems[itemId]+1 
//             }else{
//                 state.cartItems[itemId] = state.cartItems[itemId]+1
//             }
//         },

//         removeFromCart:(state,itemId)=>{
//             state.cartItems[itemId] = state.cartItems[itemId] - 1
//         }
//     }
// })



// export default userOrderSlice.reducer
// export const {reset,addToCart,removeFromCart} = userOrderSlice.actions


