import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
	loginUser(e){
		e.preventDefault();
		let userPool = this.props.app.aws.cognito.userPool;
		let userPoolId = this.props.app.aws.cognito.userPoolId;
		let userPoolURL = this.props.app.aws.cognito.userPoolURL;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		this.props.loginUser(userPool, userPoolId, userPoolURL, email, password);
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
					<div className="login-header">Login</div>
					<div id="error"></div>
					<div className="login-fields">
						<form onSubmit={this.loginUser.bind(this)}>
							<div className="login-field">
								<span>Email</span>
								<input type="text" id="email" autoComplete="off"/>
							</div>
							<div className="login-field">
								<span>Password</span>
								<input type="password" id="password"/>
							</div>
							<div className="login-submit">
								<input type="submit" onClick={this.loginUser.bind(this)}value="Log In" />
							</div>
						</form>
					</div>
					<div className="login-home-link"><Link to="/">← Go back</Link></div>
				</div>
			</div>
		);
	}
}

export default Login;
