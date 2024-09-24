import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import Footer from '../src/components/Footer/Footer';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <div>
    <Routes>
      <Route path='/' element={ <Home/> }/>
      <Route path='/cart' element={ <Cart/> }/>
      <Route path='/placeOrder' element={ <PlaceOrder/> }/>
      <Route path="/verify" element={<Verify/>}/>
      <Route path="/myorders" element={<MyOrders/>} />
    </Routes>
    </div>
  </div>
  <Footer/>
  </>
  );
}

export default App
