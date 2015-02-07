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
        console.log('status:' + status);
        console.dir(ArticleStore.getArticles())
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
