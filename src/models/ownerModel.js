import mongoose from "mongoose";

// Schema
const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  O_id:{
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
export const Owner = mongoose.model("Owner", ownerSchema);


