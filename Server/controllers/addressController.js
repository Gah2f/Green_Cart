import Address from "../models/Address.js";

export const addAddress = async (req, res) =>{
    try {
        const { address } = req.body;

     await Address.create({
            userId: req.user.id,
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
        const userId  = req.user.id;
        const addresses = await Address.find({userId});

        res.json({
            success: true,
            addresses: addresses,
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Address not found",
        })
    }
}

