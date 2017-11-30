var express = require('express');
var router = express.Router();
var formatDate = require('../util/commonFunc');
var PageModel = require('../models/page');

router.get('/list', (req, res, next) => {
  PageModel.find((err, data) => {
    res.render('articalList', { userName: req.cookies.user, pageList: data});    
  });
});
router.get('/edit', (req, res, next) => {
  console.log('req.cookies', req.cookies);
 res.render('editPageView', { userName: req.cookies.user});
});
router.post('/edit', (req, res, next) => {
  var date = new Date();
  var createTime = formatDate(date);
  var author = req.cookies.user;
  var newPage = {
      ...req.body,
      author: author,
      createTime: createTime
  }
  PageModel.create(newPage, (err, data) => {
      if (data) {
        res.send({data: 'success'})
      } else {
         res.send({err})
      }
  })
  // var formatTime = date.format('yyyy-mm-dd');
  // console.log('formatTime', formatTime)
});
module.exports = router