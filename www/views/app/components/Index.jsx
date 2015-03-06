'use strict';

var React = require('react');
var Router = require('react-router');
var Nav = require('./Nav/Nav.jsx');

var RouteHandler = Router.RouteHandler;

var Index = React.createClass({
    getInitialState: function() {
        return {}
    },
    componentDidMount: function() {

    },
    render: function () {
        return (
            <div>
                <Nav />
                <div className="container blog-container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = Index;