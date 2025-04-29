import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.js';

export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'} )
                return result.secure_url
            })
        ) 

        await Product.create({
            ...productData,
            image: imagesUrl,
        }) 

        res.json({
            success: true,
            message: "Product added successfully",
        })
        
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Product not added",
        }) 
    }
}

export const productList = async (req, res)=>{
    try {
        const products = await Product.find({});

        res.json({
            success: true,
            products: products,
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Product not found",
        })
    }
}

export const productById = async (req, res)=>{
    try {
        const { id }= req.body;
        const product = await Product.findById(id);
        res.json({
            success: true,
            product: product,
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Product not found",
        })
    }
}
export const changeStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body;

        await Product.findByIdAndUpdate(id, { inStock });
        res.json({
            success: true,
            message: "Product stock updated successfully",
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Product not found",
        })
    }
}
