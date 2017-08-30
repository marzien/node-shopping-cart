const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let app = express();

app.use(bodyParser.json());

Product = require('./models/product');
User = require('./models/user');
Order = require('./models/order');

// Connect to Mongoose
//mongoose.connect('mongodb://localhost/shopping-cart'); //local DB
mongoose.connect('mongodb://admin:user123@ds157833.mlab.com:57833/shopping-cart');
let db = mongoose.connection;

app.get('/', function(req, res) {
    res.send('Please use:'+ '<br/>'
        +' /users '+ '<br/>'
        +'/products'+ '<br/>'
        +'/orders'+ '<br/>'+ ' or '
        +'/order?product=productIDe&quantity=X&user=userID');
});

app.get('/products', function(req, res){
    Product.getProducts(function(err, products){
        if(err){
            console.log('Error: no products');
        }
        res.json(products);
    })
});

app.get('/products/:_id', function(req, res){
    Product.getProductById(req.params._id, function(err, product){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(product);

    })
});

app.post('/products', function(req, res){
    let product = req.body;
    Product.addProduct(product, function(err, product){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(product);
    })
});

app.put('/products/:_id', function(req, res){
    let id = req.params._id;
    let product = req.body;
    Product.updateProduct(id, product, {}, function(err, product){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(product);
    })
});

app.delete('/products/:_id', function(req, res){
    let id = req.params._id;
    Product.removeProduct(id, function(err, product){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(product);
    });
});
//-------------------------------------------------------
app.get('/users', function(req, res){
    User.getUsers(function(err, users){
        if(err){
            console.log('Error: no users');
        }
        res.json(users);
    })
});

app.post('/users', function(req, res){
    let user = req.body;
    User.addUser(user, function(err, user){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(user);
    })
});

app.put('/users/:_id', function(req, res){
    let id = req.params._id;
    let user = req.body;
    User.updateUser(id, user, {new:true}, function(err, user){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(user);
    });
});

app.delete('/users/:_id', function(req, res){
    let id = req.params._id;
    User.removeUser(id, function(err, user){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(user);
    });
});


//-------------------------------Order logic--------------------------------------

app.get('/orders', function(req, res){
    Order.getOrders(function(err, orders){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(orders);
    })
});

app.post('/order', function(req, res){
    //console.log(req.params);
    let productID = req.query.product;
    let orderQuant = req.query.quantity;
    let userID = req.query.user;

    Promise.all([
        User.getUserMoney(userID), //give back userMoney
        Product.getProductData(productID) //give back productQuant productPrice
    ]).then(values => {
        let userMoney = values[0];
        let productQuant = values[1][0];
        let productPrice = values[1][1];
        console.log('User money: ', userMoney);
        console.log('Product quant in shop: ', productQuant);
        console.log('Product price: ', productPrice);
        console.log('Order quantity ', orderQuant);
        // checking conditions
        if (orderQuant > productQuant) {
            console.log('Not enough product quantity in shop');
        } else if (userMoney < productPrice * orderQuant) {
            console.log('Not enough users money for purchase');
        } else {
            // create Order record
            Order.createOrder(userID, productID, orderQuant, function(err, user){
                if(err) {
                    throw err;
                }
                console.log('Order created!');
            });
            // deduct money from user
            let newUserMoney = userMoney-(productPrice * orderQuant);
            User.deductUserMoney(userID, newUserMoney, {new:true}, function(err, user){
                // {new:true} - printout new value
                if(err){
                    console.log('Error ' + err.message);
                }
                res.json(user);
                console.log('User money updated!');
            });

            // update Product quantity
            let newProductQuant = productQuant - orderQuant;
            Product.updateProductQuantity(productID, newProductQuant, {new:true}, function(err, product){
                if(err){
                    console.log('Error ' + err.message);
                }
                //res.json(product);
                console.log('Product quantity updated!');
            });
        }
    })
});

//---------------------------------------------------------------------

app.listen(3000);
console.log('Running on port 3000');

//---------------------------------------------------------------------


