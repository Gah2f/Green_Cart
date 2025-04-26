import express from 'express';
import { updateCart } from '../controllers/cardController';
import authUser from '../middlewares/authUser';

const cartRouter = express.Router();

cartRouter.get('/update',authUser ,updateCart)

export default cartRouter;