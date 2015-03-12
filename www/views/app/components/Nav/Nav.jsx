var React = require('react');
var Router = require('react-router');

var AuthStore = require('../../stores/AuthStore');

var Link = Router.Link;

var Nav = React.createClass({
    getInitialState: function () {
        return {
            post: !!AuthStore.getToken()
        }
    },
    mixins: [Router.State],
    render: function () {
        var routeConfig = ["Home", "Tags", "About"];
        if (this.state.post) {
            routeConfig.push('Post');
        }
        return (
            <div className="blog-masthead">
                <div className="container">
                    <nav className="blog-nav">
                        {routeConfig.map(function(v, index) {
                            return <Link key={index} className="blog-nav-item" to={v}>{v}</Link>
                        })}
                    </nav>
                </div>
            </div>
        )
    }
});

module.exports = Nav;