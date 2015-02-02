var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);

var routes = require('./server/routes/index');

var dbConfig = require('./db');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, './www'), path.join(__dirname, './www/views') ]);
app.set('view engine', 'jsx');

var options = {
    jsx: {
        harmony: true
    }
};
app.engine('jsx', require('express-react-views').createEngine(options));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'jackhu.me',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
    key: 'zwhu',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        db: dbConfig.db,
        host: dbConfig.host,
        port: dbConfig.port
    })

}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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
