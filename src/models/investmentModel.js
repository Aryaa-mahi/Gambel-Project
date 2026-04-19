import mongoose from "mongoose";

// Schema
const investSchema = new mongoose.Schema({
  Duration: {
    type: String,
    required: true,
  },
  Amount:{
      type: Number,
      required : true,
  },
  I_id: {
    type: String,
    required: true,
  },
  U_id:{
      type: String,
      required : true,
  },
  verifyed :{
    type : Boolean,
  },
  coin :{
    type : Number,   //-> coins or tokens 
    required : false,
  },
});

// Model
export const Invest = mongoose.model("Invest", investSchema);


