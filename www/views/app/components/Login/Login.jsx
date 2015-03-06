'use strict';

var React = require('react');
var Router = require('react-router');
var AuthViewActionCreators = require('../../actions/AuthViewActionCreators');
var AuthStore = require('../../stores/AuthStore');

var Login = React.createClass({
    mixins: [Router.Navigation],
    statics: {
        willTransitionTo: function (transition) {
            if (AuthStore.getToken()) {
                transition.redirect('Home');
            }
        }
    },
    getInitialState: function () {
        return null;
    },
    componentWillMount: function () {
        AuthStore.addChangeListener(this._signin);
    },
    componentWillUnmount: function () {
        AuthStore.removeChangeListener(this._signin);
    },
    _handleSubmit: function (e) {
        e.preventDefault();
        var name = this.refs.name.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        AuthViewActionCreators.signin({
            name: name,
            password: password
        });
    },
    _signin: function () {
        if (AuthStore.getToken()) {
            this.replaceWith('/');
        } else {
            alert(AuthStore.getErrorMsg());
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