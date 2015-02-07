'use strict';

var React = require('react');
var Router = require('react-router');
var ajax = require('../../utils/ajax');
var ArticleActions = require('../../actions/ArticleAction');
var ArticleStore = require('../../stores/ArticleStore');
var AuthStore = require('../../stores/AuthStore');


var Link = Router.Link;

var Login = React.createClass({
    mixins: [Router.Navigation],
    statics: {
        willTransitionTo: function (transition) {
            if (!AuthStore.getToken()) {
                transition.redirect('Home');
            }
        }
    },
    getInitialState: function () {
        return (null);
    },
    componentWillMount: function () {
        ArticleStore.addChangeListener(this._postArticle);
    },
    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._postArticle);
    },
    _postArticle: function () {
        if (ArticleStore.getPostStatus()) {
            this.replaceWith('Home');
        } else {
            alert('can le ba!');
        }
    },
    _handleSubmit: function (e) {
        e.preventDefault();
        ArticleActions.postArticle({
            title: this.refs.title.getDOMNode().value,
            tags: this.refs.tags.getDOMNode().value.split(','),
            titlePic: this.refs.titlePic.getDOMNode().value,
            summary: this.refs.summary.getDOMNode().value,
            content: this.refs.content.getDOMNode().value
        });
    },
    render: function () {
        return (
            <form className="well" onSubmit={this._handleSubmit}>
                <div className="form-group">
                    <input placeholder="今天写什么呢?"
                        className="form-control"
                        ref="title"
                    />
                </div>
                <div className="form-group">
                    <input placeholder="标签"
                        className="form-control"
                        ref="tags"
                    />
                </div>
                <div className="form-group">
                    <input placeholder="缩略图"
                        className="form-control"
                        ref="titlePic"
                    />
                </div>
                <div className="form-group">
                    <h3>摘要</h3>
                    <textarea
                        className="form-control"
                        style={{'minWidth': '100%', 'minHeight': '200px'}}
                        ref="summary"
                    />
                </div>
                <div className="form-group">
                    <h3>内容</h3>
                    <textarea
                        className="form-control"
                        style={{'minWidth': '100%', 'minHeight': '400px'}}
                        ref="content"
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary"> 保存 </button>
                </div>
            </form>
        );
    }
});

module.exports = Login;