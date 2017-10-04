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
				<div className="theater-container">
					<video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay muted></video>
					<div className="theater-interaction-container">
					</div>
				</div>
			</div>
		);
	}
}

export default Theater;
