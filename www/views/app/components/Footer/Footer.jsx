'use strict';

var React = require('react');

var Footer = React.createClass({
    getInitialState: function () {
        return null;
    },
    render: function () {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="submit">
                                <p className="text-center">Copyright ©2015 回家种地去__</p>
                                <p className="text-center">power by BootStrap ❤ React ❤ MongoDb ❤ NodeJs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
});

module.exports = Footer;