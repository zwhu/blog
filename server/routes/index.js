var express = require('express');
var app =express();
var router = express.Router();

var User = require('../model/User');


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

router.post('/login', function(req, res, next) {
    var user = new User();
    user.get(req.body.name, function(e, v) {
        if (!e &&  v && v.password === req.body.password) {
            return res.status(200).end();
        }
        //TODO: 以后要对HTTP的请求返回错误做出规范
        return res.status(404).end();
    });
});


module.exports = router;
