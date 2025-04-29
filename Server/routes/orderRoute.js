import express from "express";
import {
  addOrder,
  getAllOrders,
  getUserOrders,
  placeOrderStripe,
  
} from "../controllers/orderController.js";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
const orderRouter = express.Router();

orderRouter.post("/cod", authUser, addOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);

export default orderRouter;
