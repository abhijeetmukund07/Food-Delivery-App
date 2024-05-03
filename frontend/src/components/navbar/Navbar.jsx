import React, { useEffect, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { NavLink } from "react-router-dom";
import { resetState,setLoginStatus } from "../../redux/userLoginSlice";
import { useSelector, useDispatch } from "react-redux";


const Navbar = () => {

  const { loginStatus} = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  function logOut() {
    //remove token from session storage
    sessionStorage.removeItem("token");
    //reset the state
    let resetActionObj = resetState();
    //dispatch the resetActionObj to redux store to reset the userLogin State
    dispatch(resetActionObj);
  }
  
  useEffect(()=>{
    dispatch(setLoginStatus())
  },[loginStatus])
  
  const [active, setActive] = useState("home");

  return (
    <div className="container w-100">
      <div className="navbar navbar-expand-sm navbar-custom">
        <NavLink to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </NavLink>

        <ul className="nav custom-navbar-menu">
          <li
            onClick={() => setActive("home")}
            className={active === "home" ? "nav-item  custom-navbar-link-active" : "nav-item"}
          >
            <NavLink id="navlink-home">Home</NavLink>
          </li>

          <li
            onClick={() => setActive("menu")}
            className={active === "menu" ? "nav-item custom-navbar-link-active" : "nav-item"}
          >
            <NavLink className="" id="navlink-menu">
              Menu
            </NavLink>
          </li>

          <li
            onClick={() => setActive("contactUs")}
            className={active === "contactUs" ? "nav-item  custom-navbar-link-active" : "nav-item"}
          >
            <NavLink className="" id="navlink-contact-us">
              Contact Us
            </NavLink>
          </li>
        </ul>

        <div className="custom-navbar-right">
          {/* <img src={assets.search_icon} alt="" /> */}

          <div className="custom-navbar-basket-icon">
            <NavLink to='/cart'>
              <img src={assets.basket_icon} alt="" />
            </NavLink>
            <div className="custom-navbar-cart-indicator"></div>
          </div>

          {loginStatus === false ? (
            <NavLink to="/login">
              <button className=" custom-navbar-btn">Sign in</button>
            </NavLink>
          ) : 
          <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                  <NavLink to='/my-orders' className="navlink"><img src={assets.bag_icon} alt="" /><p>Orders</p></NavLink>
                  <hr />
                  <NavLink className="navlink" onClick={()=>logOut()}><img src={assets.logout_icon} alt="" /><p>Logout</p></NavLink>
                </ul>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
