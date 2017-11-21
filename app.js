var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');
var routes = require('./routes/routes');

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
var port = 3002;
var server  = require("http").createServer(app);
var io = require("socket.io")(server);
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
app.use(session);
//var sharedsession = require("express-socket.io-session");
///io.use(sharedsession(session, { autoSave:true }));



var Sequelize = require('sequelize');
var sequelize = new Sequelize('game', 'root', '');
var histories = sequelize.define('histories', {
    userName: {
        type: Sequelize.STRING,
        primaryKey: false
    },
    history: Sequelize.STRING
});
sequelize.sync();



io.on('connection', function (socket) {
    socket.on('playit', function (data) {
        console.log('other event----------------------------------------------------------------------------------------------------------');
        socket.broadcast.emit('news', { hello: 'world' });
    });
    socket.on('updateData', function (data) {
        console.log('update dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa----------------------------------------------------------------------------------------------------------');
        socket.broadcast.emit('update', data);
    });
    socket.on('winner', function (data) {
        console.log('-----------------------------------winnerdata store in database------------------------------------------------------------------------------------------------')
        console.log(data)
        sequelize.sync().then(function() {
            return histories.create({
                userName: data.data,
                history: data.data+' won game on date'+  new Date()
            });
        })
    });
});
app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});







server.listen(port);
console.log('server listening on '+ port);












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
var app = module.exports = express(); //now app.js can be required to bring app into any file

















