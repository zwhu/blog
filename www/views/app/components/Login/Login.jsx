'use strict';

var React = require('react');
var Router = require('react-router');
var ajax = require('../../utils/ajax');
var AuthAction = require('../../actions/AuthAction');
var AuthStore = require('../../stores/AuthStore');

var Link = Router.Link;

var Login = React.createClass({
    mixins: [Router.Navigation],

    statics: {
        willTransitionTo: function (transition) {
            if (AuthStore.getToken()) {
                transition.redirect('Home');
            }
        }
    },

    //可以返回错误处理
    getInitialState: function () {
        return null;
    },
    componentWillMount: function () {
        AuthStore.addChangeListener(this._signinSuccess);
    },
    componentWillUnmount: function () {
        AuthStore.removeChangeListener(function () {

        });
    },
    _handleSubmit: function (e) {
        e.preventDefault();
        var name = this.refs.name.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        AuthAction.signin({
            name: name,
            password: password
        });
    },
    _signinSuccess: function () {
        if (AuthStore.getToken()) {
            this.replaceWith('/');
        }
    },
    render: function () {
        return (
            <form className="container well login" style={{'width': '400px'}} onSubmit={this._handleSubmit}>
                <div>
                    <input className="form-control" ref="name" type="text" placeholder="名称" />
                </div>
                <div>
                    <input className="form-control" ref="password" type="password" placeholder="密码" />
                </div>
                <div className="container">
                    <button type="submit" className="btn"> 登录 </button>
                </div>
            </form>
        );
    }
});

module.exports = Login;