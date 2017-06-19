var User = require('../models/user');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping-cart');

var users =  [
    new User({
        firstName: 'testuser1f',
        secondName: 'testuser1s',
        money: 100
    }),
    new User({
        firstName: 'testuser2f',
        secondName: 'testuser1s',
        money: 200
    }),
    new User({
        firstName: 'testuser3f',
        secondName: 'testuser1s',
        money: 300
    }),
    new User({
        firstName: 'testuser4f',
        secondName: 'testuser1s',
        money: 400
    }),
    new User({
        firstName: 'testuser5f',
        secondName: 'testuser1s',
        money: 500
    })
];

var done = 0;
for (var i = 0; i < users.length; i++) {
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