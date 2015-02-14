'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Articles = React.createClass({
    render: function () {
        return (
            <RouteHandler />
        );
    }
});

module.exports = Articles;