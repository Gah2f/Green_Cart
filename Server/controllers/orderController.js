import Order from "../models/Order";
import Product from "../models/product";

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

export const getUserOrders = async (req, res) =>{
try {
    const { userId } = req.body;
    const orders = await Order.find({
        userId: userId,
        $or : [{paymentType: "COD"}, {isPaid : true}]
    
    }).populate("items.product address").sort({createdAt: -1});;
    res.json({
        success: true,
        orders: orders,
    })
} catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
}

}
