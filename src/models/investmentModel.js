import mongoose from "mongoose";
import { required } from "zod/mini";

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
  status:{
    type :String,
  },
  intrest:{
    type :Number,
    required: true,
  }
});

// Model
export const Invest = mongoose.model("Invest", investSchema);


