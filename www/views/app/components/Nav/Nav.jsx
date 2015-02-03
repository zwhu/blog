var React = require('react/addons');
var Router = require('react-router');

var AuthStore = require('../../stores/AuthStores');

var Link = Router.Link;

var Nav = React.createClass({
    getInitialState: function () {
        return {
            post: !!AuthStore.getToken()
        }
    },
    componentWillMount: function () {
    },
    mixins: [Router.State],
    render: function () {

        var routeConfig = {
            "Home": "Home",
            "About": "About"
        };

        if (this.state.post) {
            routeConfig.Post = 'Post'
        }

        var items = {};
        var cx = React.addons.classSet;
        for (var i in routeConfig) {
            var cls = cx({
                'active': false
            });
            if (this.getRoutes().pop().name === i) {
                cls = cx({
                    'active': true
                });
            }
            items[i] = (<li className={cls}>
                <Link to={i}>{routeConfig[i]}</Link>
            </li>);
        }

        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="app">Hu</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                   {items}
                    </ul>
                </div>
            </nav>
        )
    }
});

module.exports = Nav;