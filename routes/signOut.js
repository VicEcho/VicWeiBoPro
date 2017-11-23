var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    console.log('sssss');
    res.clearCookie('user');
    return res.redirect('/');
});
module.exports = router;