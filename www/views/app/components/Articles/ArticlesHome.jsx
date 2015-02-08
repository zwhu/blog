'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var ArticlesHome = React.createClass({
    render: function () {
        return (
            <div>
                <Link to="app">Hello,world!!!</Link>
            </div>
        );
    }
});

module.exports = ArticlesHome;