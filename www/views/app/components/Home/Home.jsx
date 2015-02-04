'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ArticleStore = require('../../stores/ArticleStore');
var ArticleActions = require('../../actions/ArticleActions')


var Home = React.createClass({
    getInitialState: function() {
        return ({
            articles: ArticleStore.getArticles()
        });
    },
    componentWillMount:function() {
        var that = this;
        ArticleActions.getArticles();
        ArticleStore.addChangeListener(function() {
            that.setState({
                articles: ArticleStore.getArticles()
            });
        });
    },
    render: function () {
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
