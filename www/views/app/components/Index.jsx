'use strict';

var React = require('react');
var Router = require('react-router');
var Nav = require('./Nav/Nav.jsx');
var Footer = require('./Footer/Footer.jsx');

var RouteHandler = Router.RouteHandler;

var Index = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function () {
        return (
            <div>
                <Nav />
                <div className="container blog-container">
                    <RouteHandler />
                </div>
                <Footer />
            </div>
        );
    }
});

module.exports = Index;