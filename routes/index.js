const express = require('express');
const router = express.Router();

// Home page route
router.get('/', function(req, res) {
    res.send('Please use:'+ '<br/>'
        +' /user(s) '+ '<br/>'
        +'/product(s)'+ '<br/>'
        +'/order(s)'+ '<br/>'+ ' or '
        +'/order?product=productIDe&quantity=X&user=userID');
});

module.exports = router;