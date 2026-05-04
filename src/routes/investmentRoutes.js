import express from "express"
import { Invest } from "../models/investmentModel.js"
import { Investment } from "../controller/investmentController.js";
export const investRouter = express.Router();

investRouter.post("/investment",Investment);