'use strict';

var React = require('react');

var Say = React.createClass({
    render: function () {
        return (
            <div className="col-sm-4">
                <div className="well" style={{"background": "#fff"}}>
                    <p>随便说:</p>
                    <p>「此功能还在紧张的开发中....」</p>
                </div>
            </div>
        );
    }
});

module.exports = Say;