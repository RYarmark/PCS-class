var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require("http");
const io = require('socket.io');
var app = express();

var indexRouter = require('./routes/index');
const contactsApiRouter = require('./routes/contactsApi');
var usersRouter = require('./routes/users');

// Create the http server
const server = require('http').createServer(app);

// Create the Socket IO server on 
// the top of http server
const socketIo = io(server);

socketIo.on('connection', socket => {


  socket.on('update', update => {

    if (update.edit) {
      console.log(update.edit)
      socket.broadcast.emit('update', { edit: update.edit })
    }
    else if (update.add) {
      socket.broadcast.emit('update', { add: update.add })
    }
    else if (update.delete) {
      socket.broadcast.emit('update', { delete: update.delete })
    }
  });

});


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

socketIo.on('connection', socket => {
  socket.on('foo', msg => {
    socket.broadcast.emit('msg', msg)
  });
});

app.use('/', indexRouter);
app.use('/api/contacts', contactsApiRouter);
app.use('/users', usersRouter);


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {

  // Set locals, only providing error
  // in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env')
    === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app: app, server: server, io: io };