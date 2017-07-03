const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
let userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    money: {type: Number, required: true}
});

let User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
};

// Add User
module.exports.addUser = function(user, callback) {
    User.create(user, callback);
};

// Update User
module.exports.updateUser = function(id, user, options, callback) {
    let query = {_id: id};
    let update = {
        firstName: user.firstName,
        secondName: user.secondName,
        money: user.money
    };
    //console.log(update);
    User.findOneAndUpdate(query, update, options, callback);
};

// Delete User
module.exports.removeUser = function(id, callback) {
    let query = {_id: id};
    User.remove(query, callback);
};

//----------------------------------------------------------------------------------------
//Promise for getUserMoney
module.exports.getUserMoney = (id, callback) => {
    return new Promise ((resolve, reject) => {
        User.findById(id, 'money', (err, user) => {
            if(err){
                reject(err);
            }
            else{
                var userMoney = user.money;
                //res.json(userMoney);
                resolve(userMoney);
            }
        })
    })
};

// Deduct User Money
module.exports.deductUserMoney = function(id, newMoney, options, callback) {
    let query = {_id: id};
    let update = {
        money: newMoney
    };
    //console.log(update);
    User.findOneAndUpdate(query, update, options, callback);
};