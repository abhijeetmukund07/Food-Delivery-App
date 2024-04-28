import React, { useEffect } from "react";
import './ClientList.css'
import {useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
function ClientList() {

  const url = "http://localhost:4000"

  let restaurantName = sessionStorage.getItem('restaurantName')
  let restaurantId = sessionStorage.getItem('restaurantId')

  const [list,setList] = useState([]);

  const fetchList = async()=>{

    const res = await axios.get(`${url}/client/menu/${restaurantId}`)
    console.log('restaurantId: ',restaurantId)
    console.log(res)
    if(res.data.statusCode===7){
      setList(res.data.payload)
    }else{
        toast.error("Some Error Occured in retriving menu")
    }
  }

  async function removeItem(menuId){
    console.log(menuId)
    let delRes = await axios.post(`${url}/client/menu/remove`,{id:menuId})
    console.log('delete response: ',delRes.data)
    if(delRes.data.statusCode===8){
      toast.success(delRes.data.message)
      fetchList()
    }else{
      toast.error(delRes.data.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])


  return (
    <div className="client-list add flex-col">
        <p className="lead fs-3">All Foods List</p>
        <div className="client-list-table">
          <div className="client-list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {
            list.map((item,index)=>{
              return(
                <div key={index} className="client-list-table-format">
                    <img src={`${url}/images/`+item.image_filename} className="client-list-menu-item-image" alt="" />
                    <p className="fs-5 lead">{item.name}</p>
                    <p className="fs-5 lead">{item.category}</p>
                    <p className="fs-5 lead">Rs.{item.price}</p>
                    <p className=" fs-5 delete-cursor text-danger" onClick={()=>removeItem(item._id)}>X</p>
                </div>
              )
            })
          }
        </div>
    </div>
 );
}

export default ClientList;
