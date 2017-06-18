const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

Product = require('./models/product')

var app = express();

// Connect to Mongoose
mongoose.connect('mongodb://localhost/shopping-cart');
var db = mongoose.connection;

app.get('/', function(req, res) {
    res.send('Please use1 /api/books or /api/...');
});

app.get('/products', function(req, res){
    Product.getProducts(function(err, products){
        if(err){
            throw err;
        }
        res.json(products);
    })
});

app.listen(3000);
console.log('Running on port 3000');
