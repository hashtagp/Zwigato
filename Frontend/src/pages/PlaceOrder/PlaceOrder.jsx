import React, { useContext, useState,useEffect } from 'react'
import './PlaceOrder.css'
import Header from '../../components/Header/Header'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartValue,token,food_list,cartItems,url}=useContext(StoreContext);

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    block:"Administration Block",
    roomNo:"",
    phone:""
  })

  const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartValue(),
    }
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token:token}})
    if (response.data.success) {
      const { newOrderId, orderId, amount, key } = response.data;

      
      const options = {
        key: key, 
        amount: amount*100, 
        currency: "INR",
        name: "Zwigato",
        description: "Order Payment",
        order_id: orderId, 
        handler: function (response) {
          // Payment success handler
          window.location.href = `/verify?success=true&orderId=${newOrderId}`;
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Razorpay SDK not loaded.");
      }
    } else {
      alert("Error in processing the order");
    }
  };
  

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartValue()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <h2 className="title">Delivery Info</h2>
        <div className="multi-fields">
          <input required  name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required  name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="last name" />
        </div>
          <div className="block flex-col">
          <select name="block" onChange={onChangeHandler} value={data.block} required>
          <option value="Administration Block">Administration Block</option>
          <option value="RBS Block">RBS Block</option>
          <option value="Swami Vivekananda Block">Swami Vivekananda Block</option>
          <option value="Sir M.V Block">Sir M.V Block</option>
          <option value="C.V.Raman Block">C.V.Raman Block</option>
          </select>
        </div>
        <div className="multi-fields">
          <input name="RoomNo" type="text" placeholder="Room no" required/>
        </div>
        <input required  name="phone" onChange={onChangeHandler} value={data.phone} type="tel" pattern="[6-9]{1}[0-9]{9}" placeholder="Phone" />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>&#8377;{getTotalCartValue()}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p><del>&#8377;{30}</del></p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <b>Total </b>
                <b>&#8377;{getTotalCartValue()===0?0:getTotalCartValue()}</b>
              </div>
            </div>
            <button type="submit">Payment</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
