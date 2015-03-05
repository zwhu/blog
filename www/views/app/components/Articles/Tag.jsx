'use strict';

var React = require('react');


var ArticleStore = require('../../stores/ArticleStore');
var ArticleViewActionCreators = require('../../actions/ArticleViewActionCreators');

var ArticleItem = React.createClass({
    getInitialState: function() {
        return ({
            articles: []
        });
    },
    componentWillMount: function () {
        ArticleViewActionCreators.getByTag(this.props.tag);
        ArticleStore.onceChangeListener(this._setArticles);
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
                return <li key={index}><a>{result.title}</a></li>
            })}
            </ul>)
    }
});

//TODO: tags 点击事件
// 研究下 once
var Tag = React.createClass({
    getInitialState: function() {
        return {
            isOpen: false
        }
    },
    toggle: function() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    },
    buildToggleClassName: function () {
        var toggleClassName = 'tag';
        if (this.state.isOpen)
            toggleClassName += 'tag-is-open';
        return toggleClassName;
    },
    render: function () {
        return (
            <li>
                <h3 onClick={this.toggle} className={this.buildToggleClassName()}> {this.props.data}</h3>
                {this.state.isOpen ? <ArticleItem  tag={this.props.data} /> : null}
            </li>);
    }
});

module.exports = Tag;