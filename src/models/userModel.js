import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    min: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
export const User = mongoose.model("User", userSchema);


