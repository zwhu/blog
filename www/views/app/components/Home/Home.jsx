'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ArticleStore = require('../../stores/ArticleStore');
var ArticleViewActionCreators = require('../../actions/ArticleViewActionCreators');


var Home = React.createClass({
    getInitialState: function () {
        return ({
            articles: ArticleStore.getArticles()
        });
    },
    componentWillMount: function () {
        ArticleViewActionCreators.getArticles();
        ArticleStore.addChangeListener(this._setArticles);
    },
    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._setArticles);
    },
    _setArticles: function () {
        var status = ArticleStore.getStatus();
        switch (status) {
            case 'loading':
                break;
            case 'success':
                this.setState({
                    articles: ArticleStore.getArticles()
                });
                break;
            case 'false':
                alert(ArticleStore.getErrorMsg());
                break;
            default :
                break;
        }
    },
    render: function () {
        function getImg(pic) {
            if(!!pic)
                return (<img src={pic} className="blog-home-article-pic"/>)
        }
        return (
            <div className="row">
                <div className="col-sm-8">
                {this.state.articles.map(function (v) {
                    return (
                        <div className="well blog-home-article">
                            <div className="blog-home-article-basic">
                                <div className="blog-home-article-body">
                                    <h4 className="blog-home-article-title">
                                        {v.title}
                                    </h4>
                                    {getImg(v.titlePic)}
                                    <p className="blog-home-article-summary">{v.summary}</p>
                                </div>
                            </div>
                            <div className="blog-home-article-info">
                                <Link to="Article" params={{articleId: v._id}}>-Read More-</Link>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className="col-sm-4">
                    <div className="well" style={{"background": "#fff"}}>
                        <p>随便说:</p>
                        <p>「此功能还在紧张的开发中....」</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Home;
