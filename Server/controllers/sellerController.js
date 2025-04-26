import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({ success: true, message: "Login successful" });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};

export const isSellerAuth= async (req,res) =>{
try {
   return res.json({
        success: true,
        message: "User is authenticated",
      });
} catch ( error) {
    console.log(error.message);
    res.json({
        success: false,
        message: "An error occurred while checking authentication",
      });
}
} 

export const sellerLogout = async (req, res)=>{
try {
    res.clearCookie("sellerToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
      return res.json({ success: true, message: "Logout successful" });
} catch (error) {
    
}
}