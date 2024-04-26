import React from "react";
import './ClientNavbar.css'
import {assets} from '../../assets/admin_assets/assets'
function ClientNavbar() {
  return (
    <div className="client-navbar">
        <img src={assets.logo} alt="logo" className="logo" />
        <img src={assets.profile_image} alt="profile-image" className="profile-img" />
    </div>);
}

export default ClientNavbar;
