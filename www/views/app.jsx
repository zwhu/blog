'use strict';

//Define app architecture here

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
//var NotFoundRoute = require('Router/NotFoundRoute');
//var DefaultRoute = require('Router/DefaultRoute');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var run = Router.run;
var DefaultRoute = Router.DefaultRoute;

var Index = require('./app/components/Index.jsx');
//var NotFound = require('./app/components/routes/NotFound.jsx');
var About = require('./app/components/About/About.jsx');
var Login = require('./app/components/Login/Login.jsx');
var Home = require('./app/components/Home/Home.jsx');
var Post = require('./app/components/Post/Post.jsx');
var Articles = require('./app/components/Articles/Articles.jsx');
var Article = require('./app/components/Articles/Article.jsx');

var routes = (
    <Route name="app" path="/" handler={Index}>
        <DefaultRoute name="Home" handler={Home} />
        <Route name="About" path="/about" handler={About} />
        <Route name="Login" path="/login" handler={Login} />
        <Route name="Post" path="/post" handler={Post} />
        <Route name="Articles" path="articles" handler={Articles} ></Route>
        <Route name="Article" path="/articles/:articleId" handler={Article} />
    </Route>
);

run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});