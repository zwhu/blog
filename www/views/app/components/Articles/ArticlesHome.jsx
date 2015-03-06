'use strict';

var React = require('react');
var ArticleStore = require('../../stores/ArticleStore');
var ArticleViewActionCreators = require('../../actions/ArticleViewActionCreators');

var Say = require('../Say.jsx');
var Tag = require('./Tag.jsx');

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
            <div className="row">
                <div className="col-sm-8 well" style={{"background": "#fff"}}>
                    <ul>
                {
                    tags.map(function(result, index) {
                        return  (<Tag key={index} data={result} />)
                    })
                }
                    </ul>
                </div>
                <Say />
            </div>
        );
    }
});

module.exports = ArticlesHome;