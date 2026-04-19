import express from "express";
import { userRegister,userLogin } from "../controller/userController.js";

export const userRouter = express.Router();
userRouter.post("/signin",userRegister);
userRouter.post("/login",userLogin);
