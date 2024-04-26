import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
function ExploreMenu({ menuSelection, setMenuSelection }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Whats On Your Mind?</h1>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div key={index} className="explore-menu-list-item">
              <img
                src={item.menu_image}
                alt="image of dish"
                onClick={() => setMenuSelection((prev) => prev === item.menu_name ? "All" : item.menu_name )}
                className={menuSelection===item.menu_name?"active menu_image":"menu_image"}
              />
              <p className="lead menu_name">{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreMenu;
