import express from "express";
import { addAddress, getAddress } from "../controllers/addressController";
import authUser from "../middlewares/authUser";

const addressRouter = express.Router();

addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/get", authUser, getAddress);

export default addressRouter;