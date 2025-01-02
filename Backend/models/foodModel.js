import mongoose from "mongoose";

const foodSchema= new mongoose.Schema({
    name: {type: String, required: true},
    description:{type: String, required:true},
    price:{type:Number,required:true},
    image: {type: String, required:true},
    category: {type: String, required:true}
})

//or operation to check if food model already present
const foodModel =mongoose.models.food || mongoose.model("products",foodSchema);

export default foodModel;
