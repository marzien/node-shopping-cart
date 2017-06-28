const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product Schema
var productSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, enum: ["furniture", "food", "clothes"], required: true},
    url: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true}
 });

var Product = module.exports = mongoose.model('Product', productSchema);

//Get Products
module.exports.getProducts = function(callback, limit){
    Product.find(callback).limit(limit);
};

// Get Product
module.exports.getProductById = function(id, callback){
    Product.findById(id, callback);
};

// Add Product
module.exports.addProduct = function(product, callback) {
    Product.create(product, callback);
};

// Update Product
module.exports.updateProduct = function(id, product, options, callback) {
    var query = {_id: id};
    var update = {
        title: product.title,
        type: product.type,
        url: product.url,
        quantity: product.quantity,
        price: product.price
    };
    Product.findOneAndUpdate(query, update, options, callback);
};

// Delete Product
module.exports.removeProduct = function(id, callback) {
    var query = {_id: id};
    Product.remove(query, callback);
};
//-----------------------------------------------------------------------
//Promise to get product data for order
module.exports.getProductData = (id, callback) => {
    return new Promise ((resolve, reject) = > {
            User.findById(id, ['quantity', 'price'], (err, product) => {
            if(err) {
                reject(err);
            }
            else{
                productQuant = product.quantity;
            let productPrice = product.price;
            resolve(productQuant, productPrice);
            }
        })
    }
}
