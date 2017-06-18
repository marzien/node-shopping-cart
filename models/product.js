const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, enum: ["furniture", "food", "clothes"], required: true},
    url: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true}
 });

var Product = module.exports = mongoose.model('Product', userSchema);

//Get Products
module.exports.getProducts = function(callback, limit){
    Product.find(callback).limit(limit);
};