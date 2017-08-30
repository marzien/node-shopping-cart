const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
let orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},      //NEED User Ref to user by ID
    product: {type: Schema.Types.ObjectId, ref: 'Product'},   //NEED Product Ref to product by ID
    quantity: {type: Number, required: true},
    createdOn: {type: Date, default: Date.now}
});

let Order = module.exports = mongoose.model('Order', orderSchema);

// Get orders
module.exports.getOrders = function(callback, limit){
    Order.find(callback).limit(limit);
};


// Create oder
module.exports.createOrder = function(userID, productID, quantity, callback) {
    order = {
        "user": userID,
        "product": productID,
        "quantity": quantity
    };
    Order.create(order, callback);
};

