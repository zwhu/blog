'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Index = React.createClass({
    render: function () {
        return (
            <div>
                <Link to="login">View Rooms</Link>
                <br />
                <br />
                <RouteHandler />
            </div>
        );
    }
});

module.exports = Index;