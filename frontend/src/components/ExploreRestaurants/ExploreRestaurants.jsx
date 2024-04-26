import React from "react";
import "./ExploreRestaurants.css";
import { restaurant_list } from "../../assets/frontend_assets/assets";

function ExploreRestaurants({ restaurantSelection, setRestaurantSelection }) {
  return (
    <div className="explore-restaurants" id="explore-restaurants">
      <h1>Popular Restaurants</h1>
      <div className="explore-restaurants-list">
        {restaurant_list.map((item, index) => {
          return (
            <div key={index} className="explore-restaurant-list-item">
              <img
                src={item.restaurant_image}
                alt="image of restaurant"
                onClick={() => setRestaurantSelection((prev) => prev === item.restaurant_name ? "All" : item.restaurant_name) }
                className={restaurantSelection===item.restaurant_name?"restaurant_image active":"restaurant_image"}
              />
              <p className="lead restaurant_name">{item.restaurant_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreRestaurants;
