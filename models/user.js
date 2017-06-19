const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    money: {type: Number, required: true}
});

var User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
};

// Add User
module.exports.addUser = function(user, limit) {
    User.create(user, callback);
};

// Update User
module.exports.updateUser = function(id, user, options, callback) {
    var query = {_id: id};
    var update = {
        firstName: user.firstName
    };
    User.findOneAndUpdate(query, update, options, callback);
};

// Delete User
module.exports.removeUser = function(id, callback) {
    var query = {_id: id};
    User.remove(query, callback);
};