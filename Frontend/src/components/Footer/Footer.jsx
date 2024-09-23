import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate=useNavigate();
  return (
    <div>
      <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=''/>
                <p>Zwigato is your go-to food delivery app, whether you're craving comfort food or exploring new cuisines, Zwigato ensures fast, reliable, and safe delivery. Our app is built with user-friendly features and real-time tracking so you can follow your order every step of the way. At Zwigato, we're not just delivering food—we're delivering experiences.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li onClick={()=>navigate("/")}>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 912345678</li>
                    <li>contact@Zwigato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
      <p className='footer-copyright'>Copyright © 2024 Zwigato.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
