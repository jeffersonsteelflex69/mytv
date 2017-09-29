import React, { Component } from 'react';
import { Link } from 'react-router';
import api from '../lib/api';

class Register extends Component {
	registerUser(e){
		e.preventDefault();
		let self = this;
		let email = document.getElementById("email").value;
		let pass = document.getElementById("password").value;
		api.register.createUser(email, pass).then((res) => {
			alert("Successfully registered your account.\nCheck your email to confirm your account.");
			self.context.router.push('/');
		}).catch((err) => {
			let error = document.getElementById("error");
			error.style.display = "block";
			error.innerHTML = "Something went wrong";
			console.log("Could not create account: ", err.response.data);	
		});
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
								<input id="email" type="text" name="email" />
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
    router: React.PropTypes.object.isRequired
};

export default Register;
