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

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', config[app.get('env') || 'development']);
});

router.post('/login', function(req, res, next) {
    if(req.body.name === 'test' && req.body.password === '123456') {
        res.cookie('name', 'zwhu', {httpOnly: true, secret: true});
        return res.status(200).end();
    }
    return res.status(404).end();
});


module.exports = router;
