const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());

Product = require('./models/product');
User = require('./models/user');
Order = require('./models/order');

//app.use(express.static('public'));

//Routes
app.use(require('./routes/index'));
app.use("/products",require('./routes/product-route'));
app.use("/users",require('./routes/user-route'));
app.use("/order",require('./routes/order-route'));

var port = process.env.PORT || 3000;
var uristring = 'mongodb://admin:user123@ds157833.mlab.com:57833/shopping-cart'  ||  //mLab DB
                'mongodb://localhost/shopping-cart';                                 //local DB

// Connect to Mongoose
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('Error connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

let db = mongoose.connection;


app.listen(port);
console.log('Running on port 3000');


