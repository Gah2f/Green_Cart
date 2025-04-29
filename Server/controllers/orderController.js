import Order from "../models/Order.js";
import User from '../models/User.js'
import Product from "../models/product.js";
import stripe from "stripe";

export const addOrder = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({
        success: false,
        message: "Address and items are required",
      });
    }
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
    });

    res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({
        success: false,
        message: "Address and items are required",
      });
    }

    let productData = [];
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
    });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    }); 

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      }
    }) ;



    return res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
  }
};  

export const stripeWebhooks = async (req,res)=>{
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch ( error) {
    res.status(400).send(`webhook Error: ${error.message}`)
  }
 
   switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent= event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit:1,
      }) 
      const {orderId, userId}= session.data[0].metadata; 

      await Order.findByIdAndUpdate(orderId, {isPaid: true})
      await User.findByIdAndUpdate(userId, {cartItems: {}})
      break;

    }  
    
     case 'payment_intent.failed': {
      const paymentIntent= event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      }) 
      const { orderId }= session.data[0].metadata;  

      await Order.findByIdAndUpdate(orderId)
      break;

     }
      
   
    default: console.log(`Unhandeled event type: ${event.type}`);
      break;
   } 

   res.json({received: true})
}

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate({
        path: "items.product",
        select: "name image category offerPrice",
      })
      .populate("address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
  }
};
