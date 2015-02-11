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

        var routeConfig = ["Home", "Articles", "About"];

        if (this.state.post) {
            routeConfig.push('Post');
            routeConfig.push('Login');
        }

        return (
            <div className="blog-masthead">
                <div className="container">
                    <nav className="blog-nav">
                        {routeConfig.map(function(v) {
                            return <Link className="blog-nav-item" to={v}>{v}</Link>
                        })}
                    </nav>
                </div>
            </div>
        )
    }
});

module.exports = Nav;