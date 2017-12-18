var express = require('express');
var router = express.Router();
var formatDate = require('../util/commonFunc');
var PageModel = require('../models/page');
var multiparty = require('multiparty');
var mongoose = require('mongoose');

// 进入列表页面
router.get('/list', (req, res, next) => {
  PageModel.find((err, data) => {
    res.render('articalList', { userName: req.cookies.user, pageList: data});    
  });
});
// 进入日志详情页面
router.get('/detail/:id', (req, res, next) => {
  PageModel.findById(req.params.id, (err, data) => {
    if (data) {
      res.render('articalDetail', {userName: req.cookies.user, page: data, });      
    } else {
      console.log('err');
    }
  });
});
// router.post('/detail/:id', (req, res, next) => {
//   PageModel.findById(req.params.id, (err, data) => {
//     if (data) {
//       res.render('articalDetail', {userName: req.cookies.user, page: data, });      
//     } else {
//       console.log('err');
//     }
//   });
// });
// 图片上传
router.post('/upload', (req, res, next) => {
   var form = new multiparty.Form({uploadDir: './public/files/'});
   form.parse(req, (err, fields, files) => {
    var filesTmp = JSON.stringify(files,null,2);
     var inputFile = files.file[0];
     var path = inputFile.path.replace('public', '');
     console.log('inputFile.path', path);
     res.send({errno:0, data: [path]});
   });
});
// 进入编辑日志页面
router.get('/edit/:id', (req, res, next) => {
 if (req.params.id) {
  var id = mongoose.Types.ObjectId(req.params.id);
  PageModel.findById(id, (err, data) => {
    if (data) {
      res.render('editPageView', { pageDetail: data, userName: req.cookies.user});
    } else {
      res.send({err})
    }
  });
 } else {
  res.render('editPageView', { userName: req.cookies.user});
 }
});
// 进入编辑日志页面
router.get('/edit', (req, res, next) => {
  res.render('editPageView', { userName: req.cookies.user});  
 });
// 新增日志接口
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
// 修改日志接口
router.put('/edit/:id', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.params.id);
  var date = new Date();
  var createTime = formatDate(date);
  var author = req.cookies.user;
  var newPage = {
      ...req.body,
      author: author,
      createTime: createTime
  }
  PageModel.update({"_id": id}, newPage, (err, data) => {
      if (data) {
        res.send({data: 'success'})
      } else {
         res.send({err})
      }
  })
  // var formatTime = date.format('yyyy-mm-dd');
  // console.log('formatTime', formatTime)
});
// 删除日志
router.delete('/detail/:id', (req, res, next) => {
  var date = new Date();
  const id = req.params.id;
  var newId = mongoose.Types.ObjectId(id);
  var createTime = formatDate(date);
  var author = req.cookies.user;
  var newPage = {
      ...req.body,
      author: author,
      createTime: createTime
  }
  PageModel.remove({"_id": newId}, (err, data) => {
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