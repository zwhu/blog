'use strict';

var React = require('react');
var Router = require('react-router');
var ajax = require('../../utils/ajax');
var ArticleActions = require('../../actions/ArticleActions');
var ArticleStore = require('../../stores/ArticleStore');

var Link = Router.Link;

var Login = React.createClass({
    mixins: [ Router.Navigation ],
    getInitialState: function() {
        return ({
            title: '今天写什么呢?',
            tags:[],
            titlePic: '',
            summary: '',
            content:''
        });
    },
    componentWillMount:function() {
        ArticleStore.addChangeListener('posts', function() {
            console.log('posts')
        });
    },
    componentWillUnmount: function() {
        ArticleStore.removeChangeListener('posts', function() {
            console.log('posts')
        });
    },
    _handleTitleChange: function(e) {
        var obj = this.state;
        obj.title = this.refs.title.getDOMNode().value;
        this.setState(obj);
    },
    _handleTagsChange: function() {
        var obj = this.state;
        obj.tags = this.refs.tags.getDOMNode().value.split(',');
        this.setState(obj);
    },
    _handleTitlePicChange: function() {
        var obj = this.state;
        obj.titlePic = this.refs.titlePic.getDOMNode().value;
        this.setState(obj);
    },
    _handleSummaryChange: function() {
        var obj = this.state;
        obj.summary = this.refs.summary.getDOMNode().value;
        this.setState(obj);
    },
    _handleContentChange: function() {
        var obj = this.state;
        obj.content = this.refs.content.getDOMNode().value;
        this.setState(obj);
    },
    _handleClick: function(e) {
        e.preventDefault();
        ArticleActions.postArticle(this.state);
    },
    //TODO： Article store
    render: function () {
        return (
            <form className="well">
                <div className="form-group">
                    <input placeholder="今天写什么呢?"
                        className="form-control"
                        ref="title"
                        onChange={this._handleTitleChange}
                    />
                </div>
                <div className="form-group">
                    <input placeholder="标签"
                        className="form-control"
                        ref="tags"
                        onChange={this._handleTagsChange}/>
                </div>
                <div className="form-group">
                    <input placeholder="缩略图"
                        className="form-control"
                        ref="titlePic"
                        onChange={this._handleTitlePicChange}/>
                </div>
                <div className="form-group">
                    <h3>摘要</h3>
                    <textarea
                        className="form-control"
                        style={{'minWidth':'100%','minHeight':'200px'}}
                        onChange={this._handleSummaryChange}
                        ref="summary"
                         />
                </div>
                <div className="form-group">
                    <h3>内容</h3>
                    <textarea
                        className="form-control"
                        style={{'minWidth':'100%','minHeight':'400px'}}
                        onChange={this._handleContentChange}
                        ref="content"
                        />
                </div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={this._handleClick}> 保存 </button>
                </div>
            </form>
        );
    }
});

module.exports = Login;