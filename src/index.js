import express from "express";
import "dotenv/config";
import { connectDB } from "./database/db.js";
import { User } from "./models/userModel.js";
import { ownerRouter } from "./routes/ownerRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
const app = express();
app.use(express.json());
app.use("/user",userRouter);
app.use("/owner",ownerRouter);
connectDB(process.env.DATABASE_URL);


app.listen(1000, () => {
  console.log("Server is Activated");
});