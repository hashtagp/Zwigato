import React, { useContext } from 'react'
import './Cart.css'
import Header from '../../components/Header/Header'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartValue,url}= useContext(StoreContext);

  const navigate=useNavigate();
  
  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br/>
          <hr/>
          {food_list.map((item,index)=>{
            if (cartItems[item._id]>0){
              return(
                <>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)}className='cross'>X</p>
                </div>
                <hr/>
                </>
              )
            }
          })}
        </div>
        <div className="cart-bottom">
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
            <button onClick={()=>navigate('/placeOrder')}>checkout</button>
          </div>
          <div className="cart-promocode">
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Enter promo code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
