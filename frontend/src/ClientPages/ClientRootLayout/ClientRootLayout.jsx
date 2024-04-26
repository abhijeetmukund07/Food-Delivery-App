import React from "react";
import {Outlet} from 'react-router-dom'
import ClientNavbar from "../../ClientComponents/ClientNavbar/ClientNavbar";
import ClientSidebar from "../../ClientComponents/ClientSidebar/ClientSidebar";
import './ClientRootLayout.css'
function ClientRootLayout() {
  return( 
  <div>
    <ClientNavbar/>
    <hr />
    <div className="client-app-contents">
        <ClientSidebar/>
          <Outlet/>
    </div>
  </div>
  );
}

export default ClientRootLayout;
