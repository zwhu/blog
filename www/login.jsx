var React = require('react');

var index = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <meta charSet="UTF-8"/>
                    <title>{this.props.title}</title>
                    <link rel="stylesheet" href={this.props.link} />
                    <link rel="stylesheet" href='/vendor/bootstrap/dist/css/bootstrap.min.css' />
                </head>
                <body>
                    <form method="post" action="/login">
                        <div>
                            <input name="name" placeholder="name" />
                        </div>
                        <div>
                            <input name="password" placeholder="password" />
                        </div>
                        <div>
                            <button> 登录 </button>
                        </div>
                    </form>
                </body>
            </html>

        );
    }
});

module.exports = index;
