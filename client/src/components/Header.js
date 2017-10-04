import React, { Component } from 'react';
import { logoutUser } from '../utils/auth';

class Header extends Component {
	logout(e){
		e.preventDefault();
		logoutUser();	
	}

	componentDidMount(){
		this.setUsername();	
	}

	homeRedirect(e){
		e.preventDefault();
		let location = window.location.pathname;
		if(location == "/")
			return
		//this.context.router.push("/");
		window.location.href = "/";
	}

	setUsername(){
		let userPool = this.props.app.aws.cognito.userPool;
		let userPoolURL = this.props.app.aws.cognito.userPoolURL;
		let cognitoUser = userPool.getCurrentUser();
		if(cognitoUser != null) {
			cognitoUser.getSession(function(err, session) {
				if (err) {
					alert(err);
					return;
				}
				console.log(session);
				cognitoUser.getUserAttributes(function(err, result) {
					if (err) {
						alert(err);
						return;
					}
					document.getElementById("avatar").src = "https://api.adorable.io/avatars/55/" + cognitoUser.getUsername() + ".io.png"; 
					for (let i = 0; i < result.length; i++) {
						if(result[i].getName() == "email"){
							document.getElementById("username").innerHTML = result[i].getValue();
						}
					}
				});
			});
		}
	}

	render(){
		return (
			<div id="header">
				<div className="brand-container">
					<div className="brand">
						<div className="brand-logo">
							<img src="/public/img/white-tv.png" alt=""/>
						</div>
						<div className="brand-text" onClick={this.homeRedirect.bind(this)}>MyTV</div>
					</div>
				</div>
				<div className="signout">
					<span onClick={this.logout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i></span>
				</div>
				<div className="user-container">
					<div className="user-avatar">
						<img id="avatar" src="https://api.adorable.io/avatars/55/abott@adasdforable.io.png" alt="avatar" />
					</div>
					<div className="user-name">
						<span id="username"></span>
					</div>
				</div>
			</div>
		);
	}
}

Header.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Header;
