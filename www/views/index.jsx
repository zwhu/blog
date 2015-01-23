var React = require('react');


// 登陆页面的过程就可以在这边返回
// 如果cookie存在，就直接进入，如果不存在，则返回登陆页面
var index = React.createClass({
    render: function() {
        return (
                <html>
                    <head>
                        <meta charSet="UTF-8"/>
                        <title>{this.props.title}</title>
                        <link href={this.props.link} />
                    </head>
                    <body>
                        <h1>{this.props.title}</h1>
                        <p>Welcome to {this.props.title}</p>
                    </body>
                </html>

        );
    }
});

module.exports = index;
