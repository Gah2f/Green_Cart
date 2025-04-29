import User from "../models/User.js";

export const updateCart = async (req,res)=>{
    try {
        const { cartItems} = req.body;

        await User.findByIdAndUpdate(req.user.id, {cartItems});
        res.json({
            success: true,
            message: "Cart updated successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Error in updating cart",
            error: error.message
        })
    }
}