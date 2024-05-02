import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartTotal } from "../../redux/foodOrderSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, restaurantMenuList, cartTotal } = useSelector((state) => state.foodOrder);
  const token = sessionStorage.getItem('token')
  useEffect(() => {
    // Dispatch the updated cartTotal to Redux
    dispatch(updateCartTotal());
  }, [cartItems]);

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
        {restaurantMenuList.map((item, index) => {
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
              <p>{cartTotal === 0 ? 0 : cartTotal - 40}</p> {/*cartTotal is the toal including delivery fee. Hence minus 40*/}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{cartTotal === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{cartTotal}</b>
            </div>
          </div>
          <button onClick={()=>{
            if(!token){
              toast.error('Login To Checkout')
            }else if(Object.keys(cartItems).length===0){
              toast.error('No Items in cart')
            }else{
              navigate('/checkout')
            }
          }} className="w-25">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
