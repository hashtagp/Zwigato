import userModel from "../models/userModel.js"

//add items to cart
export const addToCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }else{
            cartData[req.body.itemId]++;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item added!!"});
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}

//remove item from cart
export const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]--;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item removed!!"});
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}

//fetch cart data
export const getCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        res.json({success:true,cartData});
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}


