'use strict';

//Define app architecture here

//var architect = require('tuxx/Architecture').architect;
//
//var RoomStore = require('./app/stores/RoomStore');
//var MessageStore = require('./app/stores/MessageStore');
//
//architect(RoomStore).itOutputs('rooms');
//architect(MessageStore).itNeeds('rooms').itOutputs('messages');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
//var NotFoundRoute = require('Router/NotFoundRoute');
//var DefaultRoute = require('Router/DefaultRoute');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var run = Router.run;

var Index = require('./app/components/Index.jsx');
//var NotFound = require('./app/components/routes/NotFound.jsx');gul
var About = require('./app/components/About/About.jsx');
//var RoomView = require('./app/components/room/RoomView.jsx');
//var DefaultWelcome = require('./app/components/DefaultWelcome.jsx');


var routes = (
    <Route name="app" path="/" handler={Index}>
        <Route name="About" path="/about" handler={About}>
        </Route>
    </Route>
);

run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});