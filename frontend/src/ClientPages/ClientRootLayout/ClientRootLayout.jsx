import React from "react";
import { Outlet } from "react-router-dom";
import ClientNavbar from "../../ClientComponents/ClientNavbar/ClientNavbar";
import ClientSidebar from "../../ClientComponents/ClientSidebar/ClientSidebar";
import "./ClientRootLayout.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ClientRootLayout() {
  return (
    <div>
      <ToastContainer autoClose={1500} limit={2} />
      <ClientNavbar />
      <hr />
      <div className="client-app-contents">
        <ClientSidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default ClientRootLayout;
