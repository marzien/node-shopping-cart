const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
var orderSchema = new Schema({
    user: {type: String},      //taisyt
    product: {type: String},   //taisyt
    quantity: {type: Number, required: true},
    createdOn: {type: Date, default: Date.now}
});

var Order = module.exports = mongoose.model('Order', orderSchema);

module.exports.createOrder = function(product, limit) {
    Product.create(product, callback);
};