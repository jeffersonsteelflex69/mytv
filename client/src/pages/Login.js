import React, { Component } from 'react';

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
					<hr/>
					<div>Login</div>
					<div className="login-fields">
						<div className="login-field">
							<span>Email</span>
							<input type="text" />
						</div>
						<div className="login-field">
							<span>Email</span>
							<input type="text" />
						</div>
						<div className="login-submit">
							<button>Log In</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
