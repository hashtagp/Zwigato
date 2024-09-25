import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/frontend_assets/assets';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

const MyOrders = () => {

    const [data,setData] = useState([]);
    const {url,token}=useContext(StoreContext);

    const navigate=useNavigate();

    const location = useLocation();
    const { myProp } = location.state || {};

    useEffect(()=>{
        if(myProp){
            toast.success("Order placed!!")
        }
    },[])

    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token:token}});
        setData(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
            {data && data.length>0?(
                data.slice().reverse().map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt=""/>
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" X "+item.quantity
                            }
                            else{
                                return item.name+" X "+item.quantity+","
                            }
                        })}</p>
                        <p>&#8377;{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        {
                            order.payment === "true" ? (
                                <button onClick={fetchOrders}>Track order</button>
                                ) : (
                                <button>Payment failed</button>
                                )
                        }
                    </div>
                )
            })
            ):( 
            <div className='no-orders'>
                <img src={assets.empty_cart} alt=""/>
                <p>No orders found..!!</p>
                <button onClick={() => navigate("/")}>View menu</button>
            </div>
            )
        }
      </div>
    </div>
  )
}

export default MyOrders
