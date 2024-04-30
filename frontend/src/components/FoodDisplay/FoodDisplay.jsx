import React from "react";
import "./FoodDisplay.css";
import { useEffect } from "react";
import { fetchMenuOfRestaurantThunk } from "../../redux/foodOrderSlice";
import { useSelector, useDispatch } from "react-redux";
import FoodItemCard from "../FoodItemCard/FoodItemCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
//

function FoodDisplay() {
  const dispatch = useDispatch();
  const { isPending, errorStatus, errorMessage, restaurantMenuList } = useSelector(
    (state) => state.foodOrder
  );
  const restaurantState = useLocation().state;
  console.log(restaurantState);
  // const { staticFoodList } = useSelector((state) => state.userOrder);
  // console.log(staticFoodList);

  useEffect(() => {
    // Dispatch fetchRestaurantThunk action when component mounts
    dispatch(fetchMenuOfRestaurantThunk(restaurantState));
  }, [dispatch]); // Dispatch only once when component mounts
  console.log("restaurantMenu List: ", restaurantMenuList.payload);

  if (isPending) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (errorStatus) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2></h2>
      <div className="food-display-list">
        {restaurantMenuList.payload &&
          restaurantMenuList.payload.map((item, index) => {
            return (
              <FoodItemCard
                key={index}
                id={item._id}
                name={item.name}
                description={item.desc}
                price={item.price}
                image={`http://localhost:4000/images/${item.image_filename}`}
              />
            );
          })}
      </div>
    </div>
  );
}
export default FoodDisplay;

// import React from "react";
// import "./FoodDisplay.css";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function FoodDisplay() {
//   const restaurantState = useLocation().state;
//   console.log(restaurantState)
//   return <div>FoodDisplay</div>;
// }

// export default FoodDisplay;
