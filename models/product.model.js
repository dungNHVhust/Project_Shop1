const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    status:String,
    thumbnail:String,
    position:Number,
    deleted:Boolean

});
const Product = mongoose.model('Product',product_schema,'products');

module.exports = Product;