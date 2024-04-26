import React from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import ExploreRestaurants from "../../components/ExploreRestaurants/ExploreRestaurants";
import { useState } from "react";
import './Home.css'
import { assets } from "../../assets/frontend_assets/assets";
function Home() {
let [menuSelection,setMenuSelection] = useState('All')
let [restaurantSelection,setRestaurantSelection] = useState('All')

  return( 
    <div className="homepage">
        <Header/>
        <ExploreMenu menuSelection = {menuSelection} setMenuSelection = {setMenuSelection} />
        <hr />
        <ExploreRestaurants restaurantSelection = {restaurantSelection} setRestaurantSelection = {setRestaurantSelection} />
    </div>
  );
}

export default Home;