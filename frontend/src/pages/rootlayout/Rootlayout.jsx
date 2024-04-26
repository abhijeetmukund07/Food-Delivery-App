import React from "react";
import {Outlet} from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './RootLayout.css'
const Rootlayout = () => {
  return <div>
    <Navbar/>
    {/* <hr /> */}
    <div className="userOutlet">
      <Outlet/>
    </div>
    <Footer/>
  </div>;
};

export default Rootlayout;
