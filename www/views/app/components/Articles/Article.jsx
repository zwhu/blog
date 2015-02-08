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
                <div style={{"width": "720px", "minHeight": "640px"}}>
                    <div className="media well">
                        <div className="media-left media-middle">
                            <img style={{
                                "width": "64px",
                                "height": "64px"
                            }} className="media-object" src={article.titlePic} alt="..." />
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">
                            {article.title}
                            </h4>
                                {article.summary}
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