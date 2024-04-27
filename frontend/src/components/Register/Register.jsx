Register.jsx

import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { toast } from "react-toastify";
function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const [err,setErr] = useState('')
  const [registrationStatus,setRegistrationStaus] = useState(false)

  async function handleFormSubmit(data) {
    console.log(data);
        // console.log(data) comment out to debug if needed
    //http post request to user-api
    if(data.userType === 'user'){
      // if user is registering
      let res = await axios.post('http://localhost:4000/user-api/user',data)
      console.log(res.data)
      if(res.data.statusCode === 2){
        setRegistrationStaus(true)
        toast.success('Registration Succesful')
          navigate('/login')
      }
      else if(res.data.statusCode !==2){
          setErr(res.data.message)
          toast.error(res.data.message)
      }

  }else{
      //if restaurant is registering
      let res = await axios.post('http://localhost:4000/client/user',data)
      console.log(res)
      if(res.data.statusCode === 3){
        setRegistrationStaus(true)
        toast.success('Registration Succesful')
          navigate('/login')
      }
      else if(res.data.statusCode!==3){
          setErr(res.data.message)
          toast.error(res.data.message)
      }
  }
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
          <button type="submit" className="btn btn-dark">
            Register
          </button>
        </form>
        <p className=" mt-2 text-center">Already have an account? <Link className="text-primary" to="/login">Sign In</Link></p>
      </div>
    </div>
  );
}

export default Register;
