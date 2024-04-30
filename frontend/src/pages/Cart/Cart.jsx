import React, { useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartTotal } from "../../redux/foodOrderSlice";
import { fetchMenuOfRestaurantThunk } from "../../redux/foodOrderSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, restaurantMenuList } = useSelector((state) => state.foodOrder);
  const foodItemList = restaurantMenuList.payload;
  let [cartTotal, setCartTotal] = useState(0);
  // console.log("food-item-list", foodItemList);
  // console.log('restarantsMenuList',typeof(restaurantMenuList))

  useEffect(() => {
    dispatch(fetchMenuOfRestaurantThunk());
  }, []); // Fetch menu data when component mounts

  useEffect(() => {
    getCartTotal();
  }, [cartItems, restaurantMenuList]);

  useEffect(() => {
    // Dispatch the updated cartTotal to Redux
    dispatch(updateCartTotal(cartTotal));
  }, [cartTotal]);

  function getCartTotal() {
    let currentCartTotal = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodItemList.find((product) => product._id === item);
        if (itemInfo) {
          currentCartTotal += itemInfo.price * cartItems[item];
        }
      }
    }
    setCartTotal(currentCartTotal); // Move setting state outside the loop
  }


  return (
    <div className="cart">
      <h2 className="text-center mb-4">Cart</h2>
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="lead fs-4">Items</p>
          <p className="lead fs-4">Title</p>
          <p className="lead fs-4">Price</p>
          <p className="lead fs-4">Quantity</p>
          <p className="lead fs-4">Total</p>
          <p className="lead fs-4">Remove</p>
        </div>
        <br />
        <hr />
        {foodItemList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={`http://localhost:4000/images/${item.image_filename}`} alt="" />
                  <p>{item.name}</p>
                  <p>Rs. {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs. {item.price * cartItems[item._id]}</p>
                  <p className="cart-cross" onClick={() => dispatch(removeFromCart(item._id))}>
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{cartTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{cartTotal===0?0:40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{cartTotal+40}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')} className="w-25">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
