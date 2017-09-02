const express = require('express');
const router = express.Router();

//  Product page routes
router.get('/products', function(req, res){
    Product.getProducts(function(err, products){
        if(err){
            console.log('Error: no products');
        }
        res.json(products);
    })
});

router.get('/product/:_id', function(req, res){
    Product.getProductById(req.params._id, function(err, product){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(product);

    })
});

router.post('/product/', function(req, res){
    let product = req.body;
    Product.addProduct(product, function(err, product){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(product);
    })
});

router.put('/product/:_id', function(req, res){
    let id = req.params._id;
    let product = req.body;
    Product.updateProduct(id, product, {}, function(err, product){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(product);
    })
});

router.delete('/product/:_id', function(req, res){
    let id = req.params._id;
    Product.removeProduct(id, function(err, product){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(product);
    });
});

module.exports = router;