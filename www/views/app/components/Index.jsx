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
            <div>
                <Nav />
                <div>
                    <button onClick={this._onClick}>发送</button>
                </div>
                <RouteHandler />
            </div>
        );
    },
    _onClick: function() {
        ajax.post('/posts', {}, function(status) {
            if(status === 200)
                console.log('cool')
        });
    }
});

module.exports = Index;