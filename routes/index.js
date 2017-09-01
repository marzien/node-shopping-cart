const express = require('express');
const router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Index route');
  next();
});

// Home page route
router.get('/', function(req, res) {
    res.send('Please use:'+ '<br/>'
        +' /users '+ '<br/>'
        +'/products'+ '<br/>'
        +'/orders'+ '<br/>'+ ' or '
        +'/order?product=productIDe&quantity=X&user=userID');
});

module.exports = router;