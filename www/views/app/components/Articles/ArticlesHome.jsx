'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var ArticleStore = require('../../stores/ArticleStore');
var ArticleViewActionCreators = require('../../actions/ArticleViewActionCreators');

var ArticlesHome = React.createClass({
    getInitialState: function () {
        return ({
            tags: ArticleStore.getTags()
        });
    },
    componentWillMount: function () {
        ArticleViewActionCreators.getTags();
        ArticleStore.addChangeListener(this._setTags);
    },
    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._setTags);
    },
    _setTags: function () {
        var status = ArticleStore.getStatus();
        switch (status) {
            case 'loading':
                break;
            case 'success':
                this.setState({
                    tags: ArticleStore.getTags()
                });
                break;
            case 'false':
                alert('出错了吧');
                break;
            default :
                break;
        }
    },
    render: function () {

        var tags = this.state.tags;
        return (
            <div className="container">
                <ul>
                {
                    tags.map(function(result) {
                       return  (<li>{result}</li>)
                    })
                }
                </ul>
            </div>
        );
    }
});

module.exports = ArticlesHome;