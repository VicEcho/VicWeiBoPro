var express = require('express');
var router = express.Router();
var PageModel = require('../models/page');

router.get('/', (req, res, next) => {
  PageModel.find((err, data) => {
    console.log('data', data);
    res.render('articalList', { title: '首页', userName: req.cookies.user, pageList: data});    
  });
});

module.exports = router