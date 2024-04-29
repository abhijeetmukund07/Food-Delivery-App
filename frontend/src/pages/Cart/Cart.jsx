import React from "react";
import './Cart.css'
import {useSelector} from 'react-redux'
function Cart() {

  const {cartItems, staticFoodList} = useSelector(state=>state.userOrder)

  return (
  <div className="cart">
    <div className="cart-items">
        <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          staticFoodList.map((item,index)=>{
            if(cartItems[item._id]>0){
              return(
                <div key={index} className="cart-items-title cart-items-item">
                  <p>{cartItems}</p>
                </div>
              )
            }
          })
        }
    </div>
  </div>
 );
}

export default Cart;
