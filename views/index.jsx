var React = require('react');


// 登陆页面的过程就可以在这边返回
// 如果cookie存在，就直接进入，如果不存在，则返回登陆页面
var HelloMessage = React.createClass({
    render: function() {
        return (
            <body>
                <h1>{this.props.title}</h1>
                <p>Welcome to {this.props.title}</p>
            </body>
        );
    }
});

module.exports = HelloMessage;
