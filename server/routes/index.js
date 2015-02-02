var express = require('express');
var app =express();
var router = express.Router();

var User = require('../model/User');
var Article = require('../model/Article');


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



//TODO: 1.登录成功后输出cookie的token
router.post('/login', function(req, res, next) {
    var user = new User();

    user.get(req.body.name, function(e, v) {
        if (!e &&  v && v.password === req.body.password) {
            //TODO: 使用token登陆的时候需要判断ip地址是否发生变化，如果发生变化，token登陆失败
            // 每次登录都要更新新的token
            res.cookie('token', Math.random().toString(36).substring(7), { maxAge: 24 * 60 * 60 * 10000 });
            return res.status(200).end();
        }
        //TODO: 以后要对HTTP的请求返回错误做出规范
        return res.status(404).end();
    });
});

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});

//TODO: 获取所有帖子的缩略信息
//TODO： 根据id获取帖子的详细信息
//TODO: 对错误统一处理

router.get('/articles/:id', function(req, res, next) {
    var article = new Article();
    article.get(req.id, function(e, v) {
        if (!e) {
            return res.json(v);
        }
        //TODO: 以后要对HTTP的请求返回错误做出规范
        return res.status(404).end();
    });
});

//TODO: 根据 Cookie 验证是否为本人， 和 database 对比，验证还是要做的，走心。
router.post('/posts', function(req, res, next) {

    if(!req.cookie.token)
        return res.status(404).end();

    if(!req.article)
        return res.status(404).end();

    var article = new Article(req.article);

     article.post(function(e) {
         if (!e) {
             return res.status(200).end();
         }
         //TODO: 以后要对HTTP的请求返回错误做出规范
         return res.status(404).end();
     });

});

module.exports = router;
