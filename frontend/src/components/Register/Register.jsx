import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleFormSubmit(userCred) {
    console.log(userCred);
  }

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
                {...register("userType", { required: true })}
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
                {...register("userType", { required: true })}
              />
              <label htmlFor="restaurant" className="form-check-label">
                Register
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
          <button type="submit" className="btn btn-dark">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
