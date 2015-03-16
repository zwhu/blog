'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var ArticleStore = require('../../stores/ArticleStore');
var ArticleViewActionCreators = require('../../actions/ArticleViewActionCreators');

var Say = require('../Say.jsx');
var Tag = require('./TagItem.jsx');

var Tags = React.createClass({
    mixins: [Router.State],

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
    getHandlerKey: function () {
        var key = this.getRoutes()[this.getRoutes().length - 1].name;
        var id = this.getParams().tagName;
        if (id) { key += id; }
        return key;
    },
    render: function () {
        var isShow = this.getRoutes().length > 2 ?  (<div className="well"  style={{"background": "#fff"}}>
            <RouteHandler key={this.getHandlerKey()} />
        </div>) : null;
        return (
            <div className="row">
                <div className="col-sm-8">
                    <div className="well tags-page"  style={{"background": "#fff"}}>
                        {
                            this.state.tags.map(function(result, index) {
                                return  (<Tag key={index} data={result} />)
                            })
                        }
                    </div>
                {isShow}
                </div>
                <div className="col-sm-4">
                    <Say />
                </div>
            </div>
        );
    }
});

module.exports = Tags;
