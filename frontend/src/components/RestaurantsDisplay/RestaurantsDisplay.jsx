import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurantThunk } from '../../redux/foodOrderSlice';
import RestaurantsCard from "../RestaurantsItemCard/RestaurantsCard";
import { useNavigate } from "react-router-dom";
import './RestaurantsDisplay.css';

function RestaurantsDisplay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPending, errorStatus, errorMessage, restaurantList } = useSelector((state) => state.foodOrder);
  useEffect(() => {
    // Dispatch fetchRestaurantThunk action when component mounts
    dispatch(fetchRestaurantThunk());
  }, [dispatch]); // Dispatch only once when component mounts

  console.log(typeof(restaurantList));

  // Render loading spinner while data is being fetched
  if (isPending) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (errorStatus) {
    return <div>Error: {errorMessage}</div>;
  }


  // Render the list of restaurants if available
  return (
    <div className="restaurants-display" id="restaurants-display">
      <h2>Top Restaurants Near You</h2>
      <div className="restaurants-display-list">
        {restaurantList && restaurantList.map((restaurant) => (
          <div key={restaurant.restaurantId} className="restaurant-card" onClick={()=>navigate(`/menu/${restaurant.restaurantName}`,{state:restaurant})}>
            <RestaurantsCard
            id={restaurant.restaurantId}
            name={restaurant.restaurantName}
            address={restaurant.restaurantAddress}
            email={restaurant.email}
            phone={restaurant.restaurantPhoneNumber}
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantsDisplay;















// import React from "react";
// import './RestaurantsDisplay.css'
// import {useSelector,useDispatch} from 'react-redux'
// import {fetchRestaurantThunk} from '../../redux/foodOrderSlice'
// import { useEffect } from "react";
// import RestaurantsCard from "../RestaurantsItemCard/RestaurantsCard";
// function RestaurantsDisplay() {
//   const dispatch = useDispatch();
//   const { isPending, errorStatus, errorMessage, restaurantList } = useSelector((state) => state.foodOrder);

//   useEffect(() => {
//     // Dispatch fetchRestaurantThunk action when component mounts
//     dispatch(fetchRestaurantThunk());
//   }, [dispatch]); // Dispatch only once when component mounts

//   console.log(restaurantList)


//   return (
//   <div className="restaurants-display" id="restaurants-display">
//     <h2>Top Restaurants Near You</h2>
//     <div className="restaurants-display-list">
//       {isPending===true?<p className="lead fs-1 text-center">Loading.....</p>:restaurantList.map((item,index)=>{
//         return <RestaurantsCard key={index} id={item.restaurantId} name={item.restaurantName} address={item.restaurantAddress} email={item.email} phone={item.restaurantPhoneNumber}/>
//       })}
//     </div>
//   </div>
//  );
// }

// export default RestaurantsDisplay;
