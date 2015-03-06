'use strict';

var React = require('react');
var Router = require('react-router');

var ArticleStore = require('../../stores/ArticleStore');
var ArticleViewActionCreators = require('../../actions/ArticleViewActionCreators');


var Article = React.createClass({
    mixins: [Router.State],

    getInitialState: function () {
        return ({
            article: ArticleStore.getArticle()
        });
    },
    componentWillMount: function () {
        var id = this.getParams().articleId;
        ArticleViewActionCreators.getArticle(id);
        ArticleStore.addChangeListener(this._setArticle);
    },
    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._setArticle);
    },
    _setArticle: function () {
        var status = ArticleStore.getStatus();
        switch (status) {
            case 'loading':
                break;
            case 'success':
                this.setState({
                    article: ArticleStore.getArticle()
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
        var article = this.state.article;
        if (article.length) {
            article = article[0];
            return (
                <div className="article container">
                    <div className="title">
                        <h1 style={{
                            "padding": "20px 20px 20px 0",
                            "color": "rgba(0, 0, 0, 0.7)"
                        }}>{article.title}</h1>
                    </div>
                    <div className="well"  style={{
                        "background": "#fff",
                        "word-wrap": "break-word",
                        "word-break": "normal"
                    }}>
                        <div className="content">
                            <div dangerouslySetInnerHTML={{__html: article.displayContent}}></div>
                        </div>
                        <div className="tags" style={{
                            "background-color": "#fafafa",
                            "padding": "8px 0"
                        }}>
                            <span className="glyphicon glyphicon-tags tag" aria-hidden="true"></span>
                            {article.tags.map(function (result) {
                                return (<span className="tag">
                                    <a href="/tags/{result}" style={{
                                        "color": "#696"
                                    }}>
                                    {result}
                                    </a>
                                </span>);
                            })}
                        </div>
                        <p style={{
                            "text-align": "center",
                            "margin": "10px 0 0 0"
                        }}>本篇文章由 zwhu 发表于 {article.time.minute}</p>
                    </div>

                </div>
            );
        } else {
            return (<div>'loading...'</div>);
        }

    }
});

module.exports = Article;