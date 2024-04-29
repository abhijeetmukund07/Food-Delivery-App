import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { userLoginThunk } from "../../redux/userLoginSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleFormSubmit(userCred) {
    console.log(userCred);
    const loginActionObj = userLoginThunk(userCred);
    dispatch(loginActionObj);
  }

  const { isPending, currentUser, errorStatus, errorMessage, loginStatus } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (currentUser.userType === "user") {
      navigate("/");
    } else if (currentUser.userType === "restaurant") {
      navigate(`/client/${currentUser.restaurantName}`);
    }
  }, [loginStatus]);

  return (
    <div className="register w-100 ">
      {/* {errorStatus===true&& toast.error(errorMessage)} */}
      {errorStatus === true && (
        <p className="text-center fs-4 text-danger">{errorMessage.message}</p>
      )}
      <div className="form-container container w-50 mt-2 mb-3 p-5">
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <h1 className="registerTitle text-center mt-3">Login</h1>
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
                Restaurant
              </label>
            </div>
            {errors.userType?.type === "required" && (
              <p className="form-text text-danger">UserType is required </p>
            )}
          </div>

          {/* Username */}
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

          {/* Password */}
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
            Login
          </button>
        </form>
        <p className=" mt-2 text-center">
          Do not have an account?{" "}
          <Link className="text-primary" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;