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
                    <body></body>
                    <script src={this.props.src}></script>
                </html>

        );
    }
});

module.exports = index;
