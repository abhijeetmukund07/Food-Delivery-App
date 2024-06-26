import React from "react";
import './ClientSidebar.css'
import { assets } from "../../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

function ClientSidebar() {
  let restaurantName = sessionStorage.getItem('restaurantName')

  return (
    <div className="client-sidebar">
        <div>
            <div className="client-sidebar-options">
                <NavLink to={`/client/${restaurantName}/add`} className="client-sidebar-option">
                    <img src={assets.add_icon} alt="add-icon" />
                    <p className="lead">Add items</p>
                </NavLink>

                <NavLink to={`/client/${restaurantName}/list`} className="client-sidebar-option">
                    <img src={assets.order_icon} alt="order-icon" />
                    <p className="lead">List Items</p>
                </NavLink>

                <NavLink to={`/client/${restaurantName}/orders`} className="client-sidebar-option">
                    <img src={assets.order_icon} alt="order-icon" />
                    <p className="lead">Orders</p>
                </NavLink>

            </div>
        </div>
    </div>
 );
}

export default ClientSidebar;
