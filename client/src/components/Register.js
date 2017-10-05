import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Register extends Component {
	registerUser(e){
		e.preventDefault();
		let userPool = this.props.app.aws.cognito.userPool;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		this.props.registerUser(userPool, email, password);
	}

	render(){
		return (
			<div id="login">
				<div className="login-container">
					<div className="login-brand">
						<div className="login-logo">
							<img src="/public/img/white-tv.png" alt=""/>
						</div>
						<div className="login-text">MyTV</div>
					</div>
					<div className="login-header">Register</div>
					<div id="error"></div>
					<div className="login-fields">
						<form onSubmit={this.registerUser.bind(this)}>
							<div className="login-field">
								<span>Email</span>
								<input id="email" type="text" name="email" autoComplete="off"/>
							</div>
							<div className="login-field">
								<span>Password</span>
								<input id="password" type="password" name="password" />
							</div>
							<div className="login-submit">
								<input type="submit" onClick={this.registerUser.bind(this)} value="Register" />
							</div>
						</form>
					</div>
					<div className="login-home-link"><Link to="/">← Go back</Link></div>
				</div>
			</div>
		);
	}
}

Register.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Register;
