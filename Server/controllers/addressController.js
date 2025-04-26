import Address from "../models/Address.js";

export const addAddress = async (req, res) =>{
    try {
        const { userId, address } = req.body;

     await Address.create({
            userId,
            ...address
        })

        res.json({
            success: true,
            message: "Address added successfully",
        })
     }
    catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Address not added",
        })
    }
}

export const getAddress = async (req, res)=>{
    try {
        const { userId } = req.body;
        const address = await Address.find({userId});

        res.json({
            success: true,
            address: address,
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Address not found",
        })
    }
}

