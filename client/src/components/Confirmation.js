import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import api from '../lib/api';

class Confirmation extends Component {
	componentDidMount(){
		if(!Object.keys(this.props.location.query).length > 0)
			return
		let code = this.props.location.query["code"];
		if(typeof code == "undefined")
			return
		document.getElementById("code").value = code;
	}

	confirmUser(e){
		e.preventDefault();
		let userPool = this.props.app.aws.cognito.userPool;
		let email = document.getElementById("email").value;
		let code = document.getElementById("code").value;
		this.props.confirmUser(userPool, email, code);
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
					<div className="login-header">Confirm Account</div>
					<div id="error"></div>
					<div className="login-fields">
						<form onSubmit={this.confirmUser.bind(this)}>
							<div className="login-field">
								<span>Email</span>
								<input id="email" type="text" name="email" />
							</div>
							<div className="login-field">
								<span>Code</span>
								<input id="code" type="text" name="code" />
							</div>
							<div className="login-submit">
								<input type="submit" onClick={this.confirmUser.bind(this)} value="Confirm Account" />
							</div>
						</form>
					</div>
					<div className="login-home-link"><Link to="/">← Go home</Link></div>
				</div>
			</div>
		);
	}
}

Confirmation.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Confirmation;
