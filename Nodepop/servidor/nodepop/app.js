var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


//conexion bd
var dbMongo = require('./lib/mongodb'); //no es necesario asignarlo
var dbinstall = require('./lib/installDB'); //no es necesario asignarlo
var dbinstall = require('./lib/jwtAuth'); //no es necesario asignarlo
var dbinstall = require('./lib/i18n'); //no es necesario asignarlo

//modelos


require('./models/Usuario'); //no es necesario asignarlo
require('./models/Productos'); //no es necesario asignarlo
require('./models/Token'); //no es necesario asignarlo

//apiv1

app.use('/apiv1/register',require('./routes/apiv1/register'));
app.use('/es/apiv1/register',require('./routes/es/apiv1/register'));
app.use('/product', require('./routes/product'));
app.use('/es/product', require('./routes/es/product'));
app.use('/es/token', require('./routes/es/token'));
app.use('/token', require('./routes/token'));
app.use('/apiv1/login', require('./routes/apiv1/login'));
app.use('/es/apiv1/login', require('./routes/es/apiv1/login'));
app.use('/prueba', require('./routes/prueba'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





module.exports = app;
