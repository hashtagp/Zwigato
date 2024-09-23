import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems]=useState({});
    const [token,setToken]=useState("")
    const[food_list,setFoodlist]=useState([])
    const url="http://localhost:4000"

    const addToCart = async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token:token}})
        }
    }

    const removeFromCart = async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token:token}})
        }
    }

    const getTotalCartValue=()=>{

        let totalValue=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item)
            totalValue+=itemInfo.price*cartItems[item];
            }
        }
        return totalValue; 
    }

    const fetchFoodlist=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodlist(response.data.data)
    }

    const loadCartData = async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token:token}})
        setCartItems(response.data.cartData)
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    useEffect(()=>{
        async function loadData(){
            await fetchFoodlist();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"));
        }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartValue,
        url,
        token,
        setToken
    }
    return (
       <StoreContext.Provider value={contextValue}>
        {props.children}
       </StoreContext.Provider>
    )
}

export default StoreContextProvider;
