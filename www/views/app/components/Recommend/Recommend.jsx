'use strict';

var React = require('react');

var Recommend = React.createClass({
    render: function () {
        return (
            <div className="well" style={{"background": "#fff"}}>
                <p>相关文章:</p>
                <p>「此功能正在紧张的开发中....」</p>
            </div>
        );
    }
});

module.exports = Recommend;