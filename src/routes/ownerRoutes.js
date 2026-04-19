import express from "express";
import { OwnerRegister,ownerLogin } from "../controller/ownerController.js"; 

export const ownerRouter = express.Router();
ownerRouter.post("/signin",OwnerRegister);
ownerRouter.post("/login",ownerLogin);