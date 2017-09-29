import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
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
					<div className="login-fields">
						<div className="login-field">
							<span>Email</span>
							<input type="text" />
						</div>
						<div className="login-field">
							<span>Password</span>
							<input type="text" />
						</div>
						<div className="login-submit">
							<button>Log In</button>
						</div>
					</div>
					<div className="login-home-link"><Link to="/">← Go back</Link></div>
				</div>
			</div>
		);
	}
}

export default Login;
