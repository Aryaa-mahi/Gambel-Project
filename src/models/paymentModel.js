import mongoose from "mongoose";

// Schema
const paymentSchema = new mongoose.Schema({
  Amount: {
    type: Number,
    required: true,
  },
  P_id: {
    type: String,
    required: true,
    
  },
  U_id:{
      type: String,
      required : true,
     
  },
  status :{
    type : Boolean,
  },
  coin_granted:{
    type : Number,   //-> coins or tokens 
    required : true,
  },
});

// Model
export const Payment = mongoose.model("Payment", paymentSchema);


