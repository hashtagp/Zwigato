import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay"
import "dotenv/config"


const razorpay =new Razorpay({
    key_id:process.env.RAZORPAY_ID_KEY,
    key_secret:process.env.RAZORPAY_SECRET_KEY
});


//placing user order for frontend
const placeOrder=async(req,res)=>{

    const frontend_url="https://zwigato-1.onrender.com/";
    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const razorpayOrder = await razorpay.orders.create({
            amount: req.body.amount * 100, 
            currency: "INR",
            receipt: `order_${newOrder._id}`, 
            payment_capture: 1, 
        });

        res.json({
            newOrderId: newOrder._id,
            success: true,
            orderId: razorpayOrder.id, 
            amount: req.body.amount * 100, 
            currency: "INR",
            key: process.env.RAZORPAY_ID_KEY, 
        });
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"})
        }
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}

const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}

//all orders for Admin
const listOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}

//api to update order status
const updateStatus=async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"})
    }catch(error){
        res.json({success:false,message:"Unexpected error"})
    }
}

export {placeOrder,verifyOrder,updateStatus,listOrders,userOrders}
