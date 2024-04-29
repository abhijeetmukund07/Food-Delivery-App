import React from "react";
import "./RestaurantsCard.css";
// import { assets } from "../../assets/frontend_assets/assets";
// import { useSelector, useDispatch } from "react-redux";

function RestaurantsCard({ id, name, address, phone }) {
  // const { cartItems } = useSelector((state) => state.userOrder);
  // const dispatch = useDispatch();

  return (
    <div className="restaurant-item">
      <div className="card" style={{ width: "18rem", margin: "10px" }}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            <strong>Address:</strong> {address} <br />
            <strong>Phone:</strong> {phone}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantsCard;
