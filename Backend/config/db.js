import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://hashtagp27:Pritam272003@cluster0.qbbj5.mongodb.net/devcreations").then(()=>console.log("db connected"));
}

