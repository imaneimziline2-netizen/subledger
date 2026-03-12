import { required, string } from "joi";
import mongoose  from "mongoose";

const subscriptionScema = new mongoose.Schema({
    name:{
       type :string,
        required:true
    },
    price:{
        type :Number,
    },
    billingCycle:{
        type:string,
        enum :["monthly"," yearly"]
    },
    userId: {
        
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
})

const subscription =mongoose.model("subscription",subscriptionScema)
export default subscriptionScema;
  