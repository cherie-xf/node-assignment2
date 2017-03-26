var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //mongoose
var mongoUrl = 'mongodb://localhost/xiaorui'; //connect automatic create db named demo
mongoose.connect(mongoUrl, function(err){
  if(err){
    console.log("Error on mongodb");
    process.exit(1);
  }
})

var index = require('./routes/index');
var users = require('./routes/users');
var order = require('./routes/order');
var ordersList = require('./routes/ordersList');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// custom
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-confirmation2'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/order', order);
app.use('/ordersList', ordersList);

// end db connection
process.on('SIGINT', function(){
  mongoose.Collection.close(function(){
    console.log("Closing the db Collection");
    process.exit(0);

  });
})

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
