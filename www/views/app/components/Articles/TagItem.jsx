'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


//TODO: tags 点击事件
// 研究下 once
var TagItem = React.createClass({
    render: function () {
        return (
                <span className="tag"><Link to="ArticleItemByTag" params={{tagName: this.props.data}} style={{
                    "color": "#696"
                }}>{this.props.data}</Link></span>
            );
    }
});

module.exports = TagItem;
