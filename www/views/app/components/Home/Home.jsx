'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ArticleStore = require('../../stores/ArticleStore')


var Home = React.createClass({
    getInitialState: function() {
        return null;
    },
    componentWillMount:function() {
        ArticleStore.getArticles(function(data) {
            console.dir(data);
        });
    },
    render: function () {
        return (
            <div>
                <h2>Hello,world!!!!!!!!!</h2>
            </div>
        );
    }
});

module.exports = Home;
