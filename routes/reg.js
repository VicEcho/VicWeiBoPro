var express = require('express');
var router = express.Router();
var users = require('../models/users');

function getUserPromise(name, users) {
    return new Promise((resolve, reject) => {
        users.find({name: name}, (err, data) => {
            if(err) {
               console.log('查询出错');
               reject(err);
            } else {
                console.log('data', data);
                resolve(data);
            }
        });
    });
}
function checkStatus(exitUser, req, res) {
    if (exitUser.length > 0) {
            res.render('reg', { warning: '该用户名称已存在' });
        } else {
            const newUser = {
                name: req.body.name,
                password: req.body.password
            }
            const user = new users(newUser);
            user.save((err) => {
                if (err) {
                    return res.render('reg', { warning: '插入数据库失败' });
                } else {
                    res.cookie('user', req.body.name);
                    return res.redirect('/home');
                    // return res.render('reg', { warning: '创建成功' });
                    // return res.redirect('/reg');
                }
                db.close();
            });
            // res.redirect('/home');
        }
}
router.get('/', (req, res, next) => {
    res.render('reg');
});
router.post('/', (req, res, next) => {
    if (req.body.password !== req.body.passwordRepeat) {
        res.render('reg', { warning: '两次输入密码不一致' });
        // res.send('两次输入密码不一致');
        // return res.redirect('/reg');
        // req.flash('error', '两次输入的密码不一致');
    } else {
        getUserPromise(req.body.name, users)
                      .then((data) => {checkStatus(data, req, res)});
    }
});
module.exports = router;