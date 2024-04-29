import React from "react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Rootlayout from "./pages/rootlayout/Rootlayout";
import Home from "./pages/Home/Home";
import './App.css'
// client app imports
import ClientRootLayout from "./ClientPages/ClientRootLayout/ClientRootLayout";
import ClientAdd from "./ClientPages/ClientAdd/ClientAdd";
import ClientOrders from "./ClientPages/ClientOrders/ClientOrders";
import ClientList from "./ClientPages/ClientList/ClientList";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cart from "./pages/Cart/Cart";
// import Login from "./components/Login/Login";
const App = () => {
  let browserRouter = createBrowserRouter([
    {
      path:'',
      element: <Rootlayout/>,
      children:[
        {
          path: '',
          element:<Home/>
        },
        {
          path: '/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path: '/cart',
          element:<Cart/>
        }
        
      ]

    },
    {
      path:'/client/:restaurantName',
      element: <ClientRootLayout/>,
      children:[
        {
          path: 'add',
          element:<ClientAdd/>
        },
        {
          path: 'orders',
          element:<ClientOrders/>
        },
        {
            path: 'list',
            element:<ClientList/>
        }
      ]
    }
  ])
  return (<div className="app">
   <RouterProvider router={browserRouter} />
  </div>);
};

export default App;
