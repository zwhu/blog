var React = require('react');

var index = React.createClass({
    render: function() {
        return (
                <html>
                    <head>
                        <title>{this.props.title}</title>
                        <meta charSet="UTF-8"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="stylesheet" href={this.props.link} />
                    </head>
                    <body></body>
                    <script src={this.props.src}></script>
                </html>

        );
    }
});

module.exports = index;
