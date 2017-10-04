import React, { Component } from 'react';
import { Link } from 'react-router';

class Logout extends Component {
	logoutUser(){
		let self = this;	
		let userPool = this.props.app.aws.cognito.userPool;
		let cognitoUser = userPool.getCurrentUser();
		
		if (cognitoUser != null) {
			cognitoUser.getSession(function(err, session) {
				if (err) {
					alert(err);
					return;
				}
				if(session.isValid()){
					cognitoUser.globalSignOut();
					self.clearLocalStorage();
					window.location.href = "/";
				}
			});
		}
		self.clearLocalStorage();
		window.location.href = "/";
	}

	clearLocalStorage(){
		localStorage.clear();	
	}

	componentDidMount(){
		this.logoutUser();
	}

	render(){
		return (
			<div id="logout">Logging Out</div>	
		);
	}
}

export default Logout;
