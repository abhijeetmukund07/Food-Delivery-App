// FoodItemCard.js
import React, { useEffect } from "react";
import './FoodItemCard.css';
import { assets } from "../../assets/frontend_assets/assets";
import { useSelector, useDispatch } from "react-redux";
import {addToCart,removeFromCart} from '../../redux/foodOrderSlice'


function FoodItemCard({ id, name, price, description, image }) {

    const { cartItems } = useSelector(state => state.foodOrder);
    const dispatch = useDispatch();
    // console.log(image)
    

    return( 
        <div className="food-item">
            <div className="food-item-img-container">
                <img src={image} alt="food pic" className="food-item-image" />
                {!cartItems[id] ? 
                    <img src={assets.add_icon_white} className="add" onClick={() => dispatch(addToCart(id))} />
                    :
                    <div className="food-item-counter">
                        <img src={assets.remove_icon_red} alt="remove-icon" onClick={() => dispatch(removeFromCart(id))} />
                        <p className="lead fs-5">{cartItems[id]}</p> {/*cartItems[id] gives us the quantity*/ }
                        <img src={assets.add_icon_green} alt="add-icon" onClick={() => dispatch(addToCart(id))} />
                    </div>
                }
            </div>

            <div className="food-item-info">
                <div className="food-item-name">
                    <p>{name}</p>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price lead fs-5">Rs.{price}</p>
            </div>
        </div>
    );
}

export default FoodItemCard;











// import React from "react";
// import './FoodItemCard.css'
// import { useEffect } from "react";
// import { assets } from "../../assets/frontend_assets/assets";
// import { useSelector } from "react-redux";
// import {addToCart,removeFromCart} from '../../redux/userOrderSlice'

// function FoodItemCard({id,name,price,description,image}) {
//     // const [itemCount, setItemCount] = useState(0)
//     const {cartItems} = useSelector(state=>state.userOrder)

//     useEffect(()=>{
//         console.log(cartItems)
//     },[cartItems])

//   return( 
//   <div className="food-item">
//     <div className="food-item-img-container">
//         <img src={image} alt="" className="food-item-image" />
//         {!cartItems[id]? <img src={assets.add_icon_white} className="add" onClick={()=>addToCart(id)} />:
//             <div className="food-item-counter">
//                 <img src={assets.remove_icon_red} alt="add-icon" onClick={()=>removeFromCart(id)} />
//                 <p className="lead fs-5">{cartItems[id]}</p>
//                 <img src={assets.add_icon_green} alt="remove-icon" onClick={()=>addToCart(id)} />
//             </div>
//         }
//     </div>

//     <div className="food-item-info">
//         <div className="food-item-name">
//             <p>{name}</p>
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">Rs.{price}</p>
//     </div>
//   </div>
// );
// }

// export default FoodItemCard;
