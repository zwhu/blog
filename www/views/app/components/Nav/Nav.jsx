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
        var routeConfig = [{name: "Home", display: "首页"}, {name: "Tags", display: "标签"}, {name: "About", display: "关于"}];
        if (this.state.post) {
            routeConfig.push({name: "Post", display: "发博"});
        }
        return (
            <nav>
                <div className="container">
                    <div className="navbar-header">
                        <Link to='Home' className="navbar-brand">回家种地去__</Link>
                    </div>

                    <ul className="nav navbar-nav navbar-right">
                        {routeConfig.map(function(v, index) {
                            return (<li><Link key={index} className="blog-nav-item" to={v.name}>{v.display}</Link></li>)
                        })}
                    </ul>
                </div>
            </nav>
        )
    }
});

module.exports = Nav;