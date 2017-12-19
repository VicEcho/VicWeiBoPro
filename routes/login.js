var express = require('express');
var router = express.Router();
var users = require('../models/users');
const crypto = require('crypto');
router.get('/', (req, res, next) => {
    res.render('login');
});
router.post('/', (req, res, next) => {
    users.findOne({name: req.body.name}, (err, data) => {
        let sha1 = crypto.createHash("sha1");
        const password = sha1.update(req.body.password + '303echo227vic').digest('hex');
        if(err) {
            res.render('login', {warning: "查询出错"}) 
        } else if (!data || data.length <= 0) {
            res.render('login', {warning: "用户不存在， 请先注册"})
        } else if (data.password !== password) {
            res.render('login', {warning: "密码错误"})            
        } else {
            // res.cookies.user = req.body.name;
            res.cookie('user', req.body.name);
            return res.redirect('/');
        }
    });
});

module.exports = router;