'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ArticleStore = require('../../stores/ArticleStore');
var ArticleActions = require('../../actions/ArticleActions');


var Home = React.createClass({
    getInitialState: function () {
        return ({
            articles: ArticleStore.getArticles()
        });
    },
    componentWillMount:function() {
        var that = this;
        ArticleStore.addChangeListener(function() {
            that.setState({
                articles: ArticleStore.getArticles()
            });
        });
        ArticleActions.getArticles();

    },
    // title 的点击到具体的文章页面应该是 link， 文章的链接应该写好
    render: function () {
        return (
            <div style={{"width": "720px", "min-height": "640px"}}>
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
                                    <h4 className="media-heading"><Link to="Article" params={{articleId: v._id}}>{v.title}</Link></h4>
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
