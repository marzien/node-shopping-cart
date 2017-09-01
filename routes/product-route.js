const express = require('express');
const router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Product route');
  next();
});

//  Product page routes
router.get('/', function(req, res){
    Product.getProducts(function(err, products){
        if(err){
            console.log('Error: no products');
        }
        res.json(products);
    })
});

router.get('/:_id', function(req, res){
    Product.getProductById(req.params._id, function(err, product){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(product);

    })
});

router.post('/', function(req, res){
    let product = req.body;
    Product.addProduct(product, function(err, product){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(product);
    })
});

router.put('/:_id', function(req, res){
    let id = req.params._id;
    let product = req.body;
    Product.updateProduct(id, product, {}, function(err, product){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(product);
    })
});

router.delete('/:_id', function(req, res){
    let id = req.params._id;
    Product.removeProduct(id, function(err, product){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(product);
    });
});

module.exports = router;