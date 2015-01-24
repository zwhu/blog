var express = require('express');
var app =express();
var router = express.Router();


var config = {
    development: {
        title: '一起离职吧！',
        link: '/stylesheets/style.css',
        src: '/javascripts/all.js'
    },
    production: {
        title: 'zwhu',
        link: '/stylesheets/style.min.css',
        src: '/javascripts/all.min.js'
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', config[app.get('env') || 'development']);
});

module.exports = router;
