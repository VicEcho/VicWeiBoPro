var express = require('express');
var router = express.Router();

/*
* 主页面
*/
router.get('/', (req, res, next) => {
    // res.send('home');
    console.log('req.cookies.user', req.cookies);
    res.render('home', { title: '首页', userName: req.cookies.user});
});
/*
* 时间 
*/
router.get('/time', (req, res, next) => {
    const nowTime = new Date().toString();
    // res.send('home');
    res.send(`This time is ${nowTime}`);
});
// router.get('/:name', (req, res, next) => {
//     console.log('ssss');
//     next();
// });
// router.get('/:name', (req, res, next) => {
//     const name = req.params.name;
//     // res.send('home');
//     res.send(`hello ${name}`);
// });
module.exports = router;