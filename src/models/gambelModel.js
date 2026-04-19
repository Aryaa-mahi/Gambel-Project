import mongoose from "mongoose";

// Schema
const gambelSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    
  },
  Amount: {
    type: Number,
    required: true,
  },
  U_id:{
      type: String,
      required : true,
  },
  G_id:{
      type: String,
      required : true,
  },
  status :{
    type : Boolean,
  },
  
});

// Model
export const Gambel = mongoose.model("Gambel", gambelSchema);


