import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [registrationStatus, setRegistrationStaus] = useState(false);
  const [userType, setUserType] = useState("user"); // Initialize userType state

  async function handleFormSubmit(data) {
    // http post request to user-api
    if (data.userType === "user") {
      // if user is registering
      try {
        let res = await axios.post("http://localhost:4000/user-api/user", data);
        console.log(res.data);
        if (res.data.statusCode === 2) {
          setRegistrationStaus(true);
          toast.success("Registration Successful");
          navigate("/login");
        } else if (res.data.statusCode === 0) {
          setErr(res.data.message);
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      }
    } else {
      // if restaurant is registering
      try {
        let res = await axios.post("http://localhost:4000/client/user", data);
        console.log(res);
        if (res.data.statusCode === 3) {
          setRegistrationStaus(true);
          toast.success("Registration Successful");
          navigate("/login");
        } else if (res.data.statusCode === 1) {
          setErr(res.data.message);
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      }
    }
  }

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="register w-100 ">
      <div className="form-container container w-50 mt-2 mb-3 p-5">
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <h1 className="registerTitle text-center mt-3">Register</h1>
          <div className="mb-2">
            <label htmlFor="user" className="form-check-label me-3">
              Register as
            </label>

            <div className="form-check form-check-inline mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                id="user"
                value="user"
                // checked={userType === "user"}
                {...register("userType", { required: true })}
                onChange={handleUserTypeChange}
              />
              <label htmlFor="user" className="form-check-label">
                User
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                id="restaurant"
                value="restaurant"
                // checked={userType === "restaurant"}
                {...register("userType", { required: true })}
                onChange={handleUserTypeChange}
              />
              <label htmlFor="restaurant" className="form-check-label">
                Restaurant
              </label>
            </div>
            {errors.userType?.type === "required" && (
              <p className="form-text text-danger">UserType is required </p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              {...register("username", { required: true, minLength: 4 })}
            />
            {errors.username?.type === "required" && (
              <p className="form-text text-danger">Username is required </p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="form-text text-danger">Username should have minimum 4 characters</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Id
            </label>
            <input
              type="email"
              className="form-control"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="form-text text-danger">Email is required </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              {...register("password", { required: true, minLength: 4 })}
            />
            {errors.password?.type === "required" && (
              <p className="form-text text-danger">password is required </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="form-text text-danger">password should have minimum 4 characters</p>
            )}
          </div>

          {/* Conditionally render additional fields for restaurant */}
          {userType === "restaurant" && (
            <>
              <div className="mb-3">
                <label className="form-label">Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("restaurantName", { required: true })}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase();
                    const formattedValue = value.split(" ").join("-");
                    e.target.value = formattedValue;
                  }}
                />
                {errors.restaurantName?.type === "required" && (
                  <p className="form-text text-danger">Restaurant Name is required </p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Restaurant Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("restaurantPhoneNumber", { required: true })}
                />
                {errors.restaurantPhoneNumber?.type === "required" && (
                  <p className="form-text text-danger">Restaurant Phone Number is required </p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Restaurant Address</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("restaurantAddress", { required: true })}
                />
                {errors.restaurantAddress?.type === "required" && (
                  <p className="form-text text-danger">Restaurant Address is required </p>
                )}
              </div>
            </>
          )}

          <button type="submit" className="btn btn-dark">
            Register
          </button>
        </form>
        <p className=" mt-2 text-center">
          Already have an account?{"  "}
          <Link className="text-primary" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
