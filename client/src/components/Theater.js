import React, { Component } from 'react';

class Theater extends Component {
	logout(e){
		e.preventDefault();
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

	render(){
		return (
			<div id="theater">
				<div id="brand-container">
					<div className="brand">
						<div className="brand-logo">
							<img src="/public/img/white-tv.png" alt=""/>
						</div>
						<div className="brand-text">MyTV</div>
					</div>
				</div>
				<div className="theater-container">
					<video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay muted></video>
					<div className="theater-interaction-container">
					</div>
				</div>
				<div className="theater-signout">
					<span onClick={this.logout.bind(this)}><i className="logout-button fa fa-sign-out" aria-hidden="true"></i></span>
				</div>
			</div>
		);
	}
}

export default Theater;
