import React, { useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { NavLink } from "react-router-dom";
const Navbar = () => {

const [active, setActive] = useState('home')

  return (
  <div className="container w-100">
    <div className="navbar navbar-expand-sm navbar-custom">
      <img src={assets.logo} alt="Logo" className="logo" />

      <ul className="nav custom-navbar-menu">
        <li onClick={()=>setActive('home')} className={active==="home"?"nav-item  custom-navbar-link-active":"nav-item"} >
          <NavLink id="navlink-home">
            Home
          </NavLink>
        </li>

        <li onClick={()=>setActive('menu')} className={active==="menu"?"nav-item custom-navbar-link-active":"nav-item"}>
          <NavLink className="" id="navlink-menu">
            Menu
          </NavLink>
        </li>

        <li onClick={()=>setActive('contactUs')} className={active==="contactUs"?"nav-item  custom-navbar-link-active":"nav-item"}>
          <NavLink className="" id="navlink-contact-us">
            Contact Us
          </NavLink>
        </li>
      </ul>

      <div className="custom-navbar-right">
          <img src={assets.search_icon} alt="" />

          <div className="custom-navbar-basket-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="custom-navbar-cart-indicator"></div>
          </div>

          <button className=" custom-navbar-btn">sign in</button>
      </div>
    </div>
  </div>)
};

export default Navbar;
