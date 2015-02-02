'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ArticleStore = require('../../stores/ArticleStore');


var Home = React.createClass({
    getInitialState: function() {
        return ({
            articles: []
        });
    },
    componentWillMount:function() {
        var that = this;
        ArticleStore.getArticles(function(data) {
            that.setState({
                articles: data
            });
        });
    },
    render: function () {
        console.log(this.state.articles);
        return (
            <ul>{this.state.articles.map(function(v) {
                return (
                    <li data-id={v._id}>
                        <div>
                            <h3>{v.title}</h3>
                            <img src={v.titlePic} />
                            <span>{v.summary}</span>
                        </div>
                    </li>
                )
            })}
            </ul>
        );
    }
});

module.exports = Home;
