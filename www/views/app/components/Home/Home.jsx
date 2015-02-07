'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ArticleStore = require('../../stores/ArticleStore');
var ArticleActions = require('../../actions/ArticleAction');


var Home = React.createClass({
    getInitialState: function () {
        return ({
            articles: ArticleStore.getArticles()
        });
    },
    componentWillMount: function () {
        ArticleActions.getArticles();
        ArticleStore.addChangeListener(this._setArticles);
    },
    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._setArticles);
    },
    _setArticles: function () {
        this.setState({
            articles: ArticleStore.getArticles()
        });
    },
    render: function () {
        return (
            <div style={{"width": "720px", "minHeight": "640px"}}>
                {this.state.articles.map(function (v) {
                    return (
                        <div className="media well">
                            <div className="media-left media-middle">
                                <img style={{
                                    "width": "64px",
                                    "height": "64px"
                                }} className="media-object" src={v.titlePic} alt="..." />
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">
                                    <Link to="Article" params={{articleId: v._id}}>{v.title}</Link>
                                </h4>
                                {v.summary}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
});

module.exports = Home;
