import Razorpay from "razorpay";
import "dotenv/config";
export const instance = new Razorpay({ key_id: process.env.YOUR_KEY_ID, key_secret: process.env.YOUR_SECRET })