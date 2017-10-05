import React, { Component } from 'react';
import { logoutUser } from '../utils/auth';
import AWS from 'aws-sdk';

class Theater extends Component {
	constructor(){
		super();
		this.state = {
			clipCount: 0,
			clipMax: 2,
			clipPlaying: true
		};
		this.logout = this.logout.bind(this);
		this.showTheaterInteractions = this.showTheaterInteractions.bind(this);
		this.getInitialClip = this.getInitialClip.bind(this);	
	}

	logout(e){
		e.preventDefault();
		logoutUser();
	}

	showTheaterInteractions(){
		document.getElementById("theater-interactions").style.display = "block";
		this.setState({
			clipPlaying: false	
		});
	}

	componentDidMount(){
		let self = this;
		document.getElementById('theater-video').addEventListener('ended', (e) => {
			self.showTheaterInteractions();
		},false);
	}
	
	componentWillReceiveProps(nextProps){
		let self = this;
		if(nextProps.app.aws.cognito.credentials != null){
			setTimeout(function(){
				self.getInitialClip();
			}, 250);
		}
	}

	getInitialClip(){
		let creds = this.props.app.aws.cognito.credentials;
		AWS.config.region = "us-west-2";
		let s3 = new AWS.S3({
			credentials: creds,
			region: "us-west-2"
		});
		let params = {Bucket: 'mytv-app', Key: 'input-folder/sfo-clip-0.mp4'};
		s3.getSignedUrl('getObject', params, function(err, url){
			if(err) console.log(err, err.stack);
			else document.getElementById("theater-video").src = url;
		});
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
							<video id="theater-video" src="" autoPlay muted></video>
						</div>
						<div id="theater-interactions" className="theater-interaction-container">
							<div className="theater-choices-container">
								<div id="theater-choice-1" className="theater-choice">
									<div className="theater-choice-thumbnail">
										<img src="/public/img/day1.jpg" alt="day1"/>
									</div>
									<div className="theater-choice-title">
										Title
									</div>
								</div>
								<div id="theater-choice-2" className="theater-choice">
									<div className="theater-choice-thumbnail">
										<img src="/public/img/day1.jpg" alt="day1"/>
									</div>
									<div className="theater-choice-title">
										Title
									</div>
								</div>
								<div id="theater-choice-3" className="theater-choice">
									<div className="theater-choice-thumbnail">
										<img src="/public/img/day1.jpg" alt="day1"/>
									</div>
									<div className="theater-choice-title">
										Title
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
