import React, { Component } from 'react';
import { logoutUser } from '../utils/auth';

class Theater extends Component {
	logout(e){
		e.preventDefault();
		logoutUser();
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
