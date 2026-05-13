import express from "express";
import { Payments } from "../controller/paymentGatewayController.js";

export const paymentRouter = express.Router();
paymentRouter.post("/payment", Payments);