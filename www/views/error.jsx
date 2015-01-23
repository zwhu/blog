var React = require('react');


// 登陆页面的过程就可以在这边返回
// 如果cookie存在，就直接进入，如果不存在，则返回登陆页面
var errorMessage = React.createClass({
    render: function() {
        return (
            <body>
                <h1>{this.props.message}</h1>
                <h2>{this.props.error.status}</h2>
                <pre>
                {this.props.error.stack}
                </pre>
            </body>
        );
    }
});
module.exports = errorMessage;
