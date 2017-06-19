const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());

Product = require('./models/product');
User = require('./models/user');

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

app.get('/products/:_id', function(req, res){
    Product.getProductById(req.params._id, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    })
});

app.post('/products', function(req, res){
    var product = req.body;
    Product.addProduct(product, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    })
});

app.put('/products/:_id', function(req, res){
    var id = req.params._id;
    var product = req.body;
    Product.updateProduct(id, product, {}, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    })
});

app.delete('/products/:_id', function(req, res){
    var id = req.params._id;
    Product.removeUser(id, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    });
});

app.get('/users', function(req, res){
    User.getUsers(function(err, users){
        //console.log(users);
        if(err){
            throw err;
            //console.log(err);
        }
        //console.log(users);
        res.json(users);
    })
});

app.post('/users', function(req, res){
    var user = req.body;
    User.addUser(user, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    })
});

app.put('/users/:_id', function(req, res){
    var id = req.params._id;
    var user = req.body;
    User.updateUser(id, user, {}, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

app.delete('/users/:_id', function(req, res){
    var id = req.params._id;
    User.removeUser(id, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

app.listen(3000);
console.log('Running on port 3000');
