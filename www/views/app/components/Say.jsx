'use strict';

var React = require('react');

var Say = React.createClass({
    render: function () {
        return (
            <div className="col-sm-4">
                <div className="well" style={{"background": "#fff"}}>
                    <p>随便说:</p>
                    <p>「前端暂时完成了3分之一，还有很多功能和优化工作没有完成，我会继续加油的....」</p>
                </div>
            </div>
        );
    }
});

module.exports = Say;