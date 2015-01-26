'use strict';

var React = require('react');
var Router = require('react-router');
var ajax = require('../../utils/ajax');

var Link = Router.Link;

var Login = React.createClass({
    getInitialState: function() {
        return ({
            name: '',
            password: ''
        });
    },
    _handleNameChange: function(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
            password: this.state.password || ''
        });
    },
    _handlePasswordChange: function(e) {
        e.preventDefault();
        this.setState({
            name: this.state.name || '',
            password: e.target.value
        });
    },
    _handleClick: function(e) {
        e.preventDefault();
        ajax.post('/login', this.state, function(xmlDoc) {
            console.log(xmlDoc);
        });
    },
    render: function () {
        return (
                <form className="container well login" style={{'width':'400px'}} onSubmit={this._handleSubmit}>
                    <div>
                        <input className="form-control" name="name" placeholder="名称" value={this.state.name} onChange={this._handleNameChange}/>
                    </div>
                    <div>
                        <input className="form-control" name="password" placeholder="密码" vakue={this.state.password}  onChange={this._handlePasswordChange}/>
                    </div>
                    <div className="container">
                        <button type="button" className="btn btn-primary" onClick={this._handleClick}> 登录 </button>
                    </div>
                </form>
        );
    }
});

module.exports = Login;