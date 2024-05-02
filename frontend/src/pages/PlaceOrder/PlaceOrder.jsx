import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./PlaceOrder.css";

function PlaceOrder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { cartTotal } = useSelector((state) => state.foodOrder);

  function handleFormSubmit(orderDetails) {
    console.log(orderDetails);
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
      <form
        action=""
        className="place-order form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
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
          <p className="lead text-danger"><sup className="text-danger">*</sup>{getFirstErrorMessage()}</p>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
