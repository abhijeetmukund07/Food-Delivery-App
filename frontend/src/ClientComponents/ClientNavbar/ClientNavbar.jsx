import React,{useEffect} from "react";
import './ClientNavbar.css'
import {assets} from '../../assets/admin_assets/assets'
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { resetState,setLoginStatus } from "../../redux/userLoginSlice";
function ClientNavbar() {

  const {loginStatus} = useSelector(state=>state.userLogin)
  const dispatch = useDispatch()
  function logOut(){
    //remove token from session storage
    sessionStorage.removeItem('token')
    //reset the state
    let resetActionObj = resetState()
    //dispatch the resetActionObj to redux store to reset the userLogin State
    dispatch(resetActionObj)
  }

    
  useEffect(()=>{
    dispatch(setLoginStatus())
  },[loginStatus])
  

  return (
    <div className="client-navbar">
        <img src={assets.logo} alt="logo" className="logo" />

        <div className="custom-client-navbar-right">
          <img src={assets.profile_image} alt="profile-image" className="profile-img" />
          {loginStatus&&
          <NavLink to="/login">
              <button className="custom-client-navbar-btn" onClick={logOut}>Sign Out</button>
          </NavLink>}
        </div>
    </div>);
}

export default ClientNavbar;
