import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import orderModel from "./models/orderModel.js";
import { v2 as cloudinary } from 'cloudinary';



//app config
const app=express();
const port= process.env.PORT || 4000;
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//middleware
app.use(express.json())  //parsing the request
app.use(cors())  //access backend from any frontend

//DB connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/images",express.static('uploads'))



app.get('/',(req,res)=>{
    res.send("API working!!!")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

