const express = require('express');
const router = express.Router();

//  User page routes
router.get('/users', function(req, res){
    User.getUsers(function(err, users){
        if(err){
            console.log('Error: no users');
        }
        res.json(users);
    })
});

router.post('/user', function(req, res){
    let user = req.body;
    User.addUser(user, function(err, user){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(user);
    })
});

router.put('/user/:_id', function(req, res){
    let id = req.params._id;
    let user = req.body;
    User.updateUser(id, user, {new:true}, function(err, user){
        if(err){
            console.log('Error: ' + err.message);
        }
        res.json(user);
    });
});

router.delete('/user/:_id', function(req, res){
    let id = req.params._id;
    User.removeUser(id, function(err, user){
        if(err){
            console.log('Error: ' + err.value + ' is wrong ID');
        }
        res.json(user);
    });
});

module.exports = router;