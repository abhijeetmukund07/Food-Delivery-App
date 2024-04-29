import React from "react";
import './FoodDisplay.css'
import {useSelector} from 'react-redux'
import FoodItemCard from "../FoodItemCard/FoodItemCard";
function FoodDisplay({menuSelection}) {

    const {staticFoodList} = useSelector(state=>state.userOrder)
    console.log(staticFoodList)
  return <div className="food-display" id="food-display">
    <h2>Top Dishes Near You</h2>
    <div className="food-display-list">
      {staticFoodList.map((item,index)=>{
        if(menuSelection==='All' || menuSelection === item.category){
          return <FoodItemCard key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
        }
      })}
    </div>
  </div>;
}

export default FoodDisplay;
