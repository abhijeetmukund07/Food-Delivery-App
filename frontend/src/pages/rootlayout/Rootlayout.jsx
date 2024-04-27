import React from "react";
import {Outlet} from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './RootLayout.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Rootlayout = () => {
  return <div>
    <ToastContainer autoClose={3000} />
    <Navbar/>
    {/* <hr /> */}
    <div className="userOutlet">
      <Outlet/>
    </div>
    <Footer/>
  </div>;
};

export default Rootlayout;
