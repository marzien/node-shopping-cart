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
    res.send('Please use: /users, /products or /order?product=productIDe&quantity=X&user=userID');
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
    User.updateUser(id, user, {new:true}, function(err, user){
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


//---------------------------------------------------------------------
app.post('/order', function(req, res){
    //console.log(req.params);
    var productID = req.query.product;
    var quantity = req.query.quantity;
    var userID = req.query.user;

    Promise.all([
        User.getUserMoney(userID), //grazinti userMoney
        Product.getProductData(productID) //grazinti productQuant productPrice
    ]).then((values => {
            let userMoney = values[0];
    let productQuant = values[1];
    let productPrice = values[2];

    if (orderQuantity > productQuantity) {
        console.log('Not enough product quantity in shop');
    } else if (userMoney < productPrice * orderQuantity) {
        console.log('Not enough users money for purchase');
    } else {
        //createOrder          POST--how???
        Order.createOrder(userID, productID, quantity, function(err, user){
            if(err) {
                throw err;
            }
            console.log('Order created!');
        });
        //deduct money from user    PUT

        //update Product quantity	PUT
    }
}))
});

//---------------------------------------------------------------------

app.listen(3000);
console.log('Running on port 3000');

//---------------------------------------------------------------------


