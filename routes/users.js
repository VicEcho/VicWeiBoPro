var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('UserModel', UserModel);
  UserModel.find((err, user) => {
    res.send(user);
    
  });
});

module.exports = router;
