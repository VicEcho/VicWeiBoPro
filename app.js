var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise=bluebird;
var config = require('./config');
mongoose.connection.openUri(config.db.mongodb);

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
var signOut = require('./routes/signOut');
var artical = require('./routes/artical');
// var edit = require('./routes/edit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登陆
// 注册
// 文章 增减查删
// 登出
// 主页
app.use('/', home);
app.use('/users', users);
app.use('/home', home);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signOut', signOut);
app.use('/artical', artical);
// app.use('/edit', edit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
