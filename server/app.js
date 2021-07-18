var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require("express-session");
const mongoose = require('mongoose');
const config = require('./config/default.js');

// 全局config
global._config = config;

var indexRouter = require('./routes/index');
var sendRouter = require('./routes/send');
var tipsRouter = require('./routes/tips');

var app = express();

process.env.PORT = config.port;

mongoose.connect(_config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection
db.once("open", function () {
  console.log("数据库连接成功");
})
db.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

db.on('disconnected', function () {
  console.log('数据库连接断开');
})

// 自定义跨域中间件
var allowCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};
app.use(allowCors); //使用跨域中间件

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300000, secure: false }
}
app.use(session(sess))

app.use('/', indexRouter);
app.use('/send', sendRouter);
app.use('/tips', tipsRouter);

require('./utils/initCronnJob'); // 初始化创建定时任务

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
