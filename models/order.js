const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
var orderSchema = new Schema({
    user: {type: String},      //NEED User Ref
    product: {type: String},   //NEED Product Ref
    quantity: {type: Number, required: true},
    createdOn: {type: Date, default: Date.now}
});

var Order = module.exports = mongoose.model('Order', orderSchema);

// Create oder
module.exports.createOrder = function(userID, productID, quantity, callback) {
    order = {
        "user": userID,
        "product": productID,
        "quantity": quantity,
        "createdOn": Date.now
    };
    Order.create(order, callback);
};

