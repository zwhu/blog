'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var ArticleStore = require('../../stores/ArticleStore');
var ArticleViewActionCreators = require('../../actions/ArticleViewActionCreators');

var ArticleItemByTag = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return ({
            articles: []
        });
    },
    componentWillMount: function () {
        var tagName = this.getParams().tagName;
        ArticleViewActionCreators.getByTag(tagName);
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
    render: function() {
        return (
            <ul>
                {this.state.articles.map(function(result, index) {
                    return (<li key={index}>
                        <Link to="Article" params={{articleId: result._id}} style={{"border-bottom": "1px dashed #1d8cbd",
                            "color": "#595959"}}>{result.title}</Link>
                    </li>)
                })}
            </ul>
        )
    }
});

module.exports = ArticleItemByTag;
