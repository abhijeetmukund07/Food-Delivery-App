import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import "./PlaceOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../redux/foodOrderSlice";
function PlaceOrder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = sessionStorage.getItem("token"); // this line is used in axiosWithToken function. that functio is also given just below
  const axiosWithToken = axios.create({
    headers: { authorization: `Bearer ${token}` },
  });
  const { cartTotal, cartItems, restaurantMenuList } = useSelector((state) => state.foodOrder);
  const restaurantId = restaurantMenuList[0].restaurantId;
  console.log('restaurantMenuList:',restaurantMenuList)
  console.log('restaurantId',restaurantId)
  async function placeOrder(addressData) {
    // console.log(orderDetails);

    let orderItems = [];
    restaurantMenuList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      orderId: Date.now(),
      restaurantId: restaurantId,
      address: addressData,
      items: orderItems,
      amount: cartTotal,
      paymentStatus: true, //lets assume it to be true until we ingegrate payment gateway such as razorpay, stripe etc.
      status: "Order Placed"
    };
    if (Object.keys(cartItems).length === 0) {
      toast.error("No Items In Cart");
    } else {
      let res = await axiosWithToken.post("http://localhost:4000/user-api/placeorder", orderData);
      console.log(res.data);
      if (res.data.statusCode === 31) {
        toast.success(res.data.message);
        dispatch(resetCart());
        navigate("/my-orders");
      } else {
        toast.error(res.data.message);
      }
    }
  }

  // Function to get the first error message
  const getFirstErrorMessage = () => {
    for (const errorKey in errors) {
      if (errors[errorKey]) {
        return errors[errorKey].message;
      }
    }
    return null;
  };

  return (
    <div className="place-order-container">
      <form action="" className="place-order form" onSubmit={handleSubmit(placeOrder)}>
        <div className="place-order-left">
          <p className="title form-label">Delivery Information</p>
          <div className="multi-fields">
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First Name is required" })}
            />
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: "Last Name is required" })}
            />
          </div>
          <input
            className="form-control"
            type="email"
            placeholder="Email Address"
            {...register("email", { required: "Email Address is required" })}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Street"
            {...register("street", { required: "Street is required" })}
          />

          <div className="multi-fields">
            <input
              className="form-control"
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
            />
            <input
              className="form-control"
              type="text"
              placeholder="State"
              {...register("state", { required: "State is required" })}
            />
          </div>

          <div className="multi-fields">
            <input
              className="form-control"
              type="text"
              placeholder="Pin Code"
              {...register("pinCode", { required: "Pin Code is required" })}
            />
            <input
              className="form-control"
              type="text"
              placeholder="Country"
              {...register("country", { required: "Country is required" })}
            />
          </div>
          <input
            className="form-control"
            type="number"
            placeholder="Phone"
            {...register("phone", { required: "Phone is required" })}
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs. {cartTotal === 0 ? 0 : cartTotal - 40}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs. {cartTotal === 0 ? 0 : 40}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>Rs. {cartTotal}</b>
              </div>
            </div>
            <button type="submit" className="w-50">
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>

      {/* Render only the first error message */}
      <div className="error-messages">
        {getFirstErrorMessage() && (
          <p className="lead text-danger">
            <sup className="text-danger">*</sup>
            {getFirstErrorMessage()}
          </p>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
