const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());

Product = require('./models/product');
User = require('./models/user');
Order = require('./models/order');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/shopping-cart');
var db = mongoose.connection;

app.get('/', function(req, res) {
    res.send('Please use /users or /products');
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

//WORKS
app.delete('/products/:_id', function(req, res){
    var id = req.params._id;
    Product.removeProduct(id, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    });
});
//-------------------------------------------------------
app.get('/users', function(req, res){
    User.getUsers(function(err, users){
        if(err){
            throw err;
        }
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
    User.updateUser(id, user, {new:true}, function(err, user1){
        if(err){
            throw err;
        }
        res.json(user1);
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


//---------------------------------------------------------------------
app.post('/products/:_id', function(req, res){
    var productId = req.query.product;
    var quantityOder = req.query.quantity;
    var userId = req.query.user;

    /*
     var productQuant = ???   //how much we have on shop?
     var productPrice = ???
     var userMoney = ???      //how much money have user?

     if (!(quantityOder <= productQuant)) {
     res.send('ERROR: not enought products!');
     } elseif (!(userMoney >= productQuant*productPrice)) {
     res.send('ERROR: user don't have enought money!');
     } else {
     //createOrder list          POST
     //deduct money from user    PUT
     //update Product qauntity	PUT
     };


     */

    Order.createOrder(product, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    })
});

//---------------------------------------------------------------------

app.listen(3000);
console.log('Running on port 3000');

//---------------------------------------------------------------------


