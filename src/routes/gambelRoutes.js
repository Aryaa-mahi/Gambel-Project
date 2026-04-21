import express from "express";
import { Gambeling,Slot } from "../controller/gamblingController.js";
export const gamblRouter = express.Router();

gamblRouter.post("/gambeling", Gambeling);
gamblRouter.post("/slot", Slot);