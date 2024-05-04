import React, { useEffect } from "react";
import "./ClientOrders.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";
function ClientOrders() {

 

  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState(false);

  let token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { authorization: `Bearer ${token}` },
  });

  const fetchAllOrders = async () => {
    const response = await axiosWithToken.get("http://localhost:4000/client/all-orders");
    console.log(response.data);
    if (response.data.statusCode === 36) {
      setOrders(response.data.payload);
    } else {
      setErr(true);
      toast.info(response.data.message);
    }
  };
  // console.log('orders: ',orders)

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, []);

  
  const statusHandler = async (event,orderId)=>{
    // console.log(event,orderId)
    const res = await axiosWithToken.post('http://localhost:4000/client/status',{
      orderId,
      status:event.target.value,
    })

    console.log(res.data)

    if(res.data.statusCode===37){
      await fetchAllOrders();
    }
  }

  return (
    <div className="order add">
      <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="client-order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="lead text-secondary order-item-food">
                  {order.items.map((item, index) => {
                    if ((index === order.items.length) === 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ",";
                    }
                  })}
                </p>
                <p className=" lead order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="">
                  <p className="lead fs-6">{order.address.street + ", "}</p>
                  <p className="lead fs-6">
                    {order.address.city +
                      "," +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.pinCode}
                  </p>
                </div>
                <p className="lead order-item-phone">{order.address.phone}</p>
              </div>
              <p className="lead fs-4">Items : {order.items.length}</p>
              <p className="lead fs-4">Amount: Rs. {order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order.orderId)} value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Cooking">Cooking</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientOrders;
