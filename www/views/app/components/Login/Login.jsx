'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Index = React.createClass({
    render: function () {
        return (
            <div>
                <Link to="Home">Hello,world!!!</Link>
            </div>
        );
    }
});

module.exports = Index;