import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description : {
        type: Array,
        required: true,
    }, 
    price : {
        type: number,
        required: true,
    },
    offerPrice: {
        type: number,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
},{minimize: false, timestamps: true}); 

const Product =  mongoose.models.product || mongoose.model('product', productSchema); 

export default Product;