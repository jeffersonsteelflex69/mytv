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
					<div className="theater-header">
						TechU Cohort 1 SFO
					</div>
					<div className="theater">
						<div className="theater-video">
							<video src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_ide=164" autoPlay></video>
						</div>
						<div className="theater-interaction-container">
							<div className="theater-choices-container">
								<div className="theater-choice">
									<div className="theater-choice-thumbnail">
										choice 1
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Theater;
