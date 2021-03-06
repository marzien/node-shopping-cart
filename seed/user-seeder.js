const User = require('../models/user');

const mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping-cart');

let users =  [
    new User({
        firstName: 'testuser1f',
        lastName: 'testuser1s',
        money: 100
    }),
    new User({
        firstName: 'testuser2f',
        lastName: 'testuser2s',
        money: 200
    }),
    new User({
        firstName: 'testuser3f',
        lastName: 'testuser3s',
        money: 300
    }),
    new User({
        firstName: 'testuser4f',
        lastName: 'testuser1s',
        money: 400
    }),
    new User({
        firstName: 'testuser5f',
        lastName: 'testuser5s',
        money: 500
    })
];

let done = 0;
for (let i = 0; i < users.length; i++) {
    users[i].save(function(err, result) {
        done++;
        if (done === users.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}