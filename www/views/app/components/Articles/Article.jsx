'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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
        if(article.length) {
            article = article[0];
            return (
                <div className="container">
                    <div className="well" style={{"background": "#fff",
                        "word-wrap": "break-word",
                        "word-break": "normal"
                    }}>
                        <div dangerouslySetInnerHTML={{__html: article.displayContent}}>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div>'loading...'</div>);
        }

    }
});

module.exports = Article;