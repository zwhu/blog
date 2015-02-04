'use strict';

var React = require('react');
var Router = require('react-router');
var Nav = require('./Nav/Nav.jsx');

var ajax = require('../utils/ajax');

var RouteHandler = Router.RouteHandler;

var Index = React.createClass({
    getInitialState: function() {
        return {}
    },
    componentDidMount: function() {

    },
    render: function () {
        return (
            <div className="container">
                <Nav />
                <div>
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = Index;