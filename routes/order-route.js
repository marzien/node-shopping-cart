const express = require('express');
const router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Order route');
  next();
});

//  Order page routes
router.get('/orders', function(req, res){
    Order.getOrders(function(err, orders){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(orders);
    })
});

router.post('/order', function(req, res){
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
                    console.log('Error ' + err.message);
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

module.exports = router;