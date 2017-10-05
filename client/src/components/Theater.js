import React, { Component } from 'react';
import { logoutUser } from '../utils/auth';
import AWS from 'aws-sdk';

class Theater extends Component {
	constructor(){
		super();
		this.state = {
			clipCount: 0,
			clipMax: 2,
			clipPlaying: true,
			stepOne: false,
			stepTwo: false
		};
		this.logout = this.logout.bind(this);
		this.showTheaterInteractions = this.showTheaterInteractions.bind(this);
		this.getInitialClip = this.getInitialClip.bind(this);
		this.registerTheaterChoiceEvents = this.registerTheaterChoiceEvents.bind(this);
		this.stitchVideos = this.stitchVideos.bind(this);
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

	registerTheaterChoiceEvents(){
		let self = this;
		for(let i = 1;i < 4;i++){
			document.getElementById("theater-choice-" + (i).toString()).addEventListener("click", function(){
				document.getElementById('theater-video').currentTime = 26;
				document.getElementById('theater-video').play();
				setTimeout(function(){
					document.getElementById("theater-interactions").style.display = "none";}, 50);
				self.setState({stepOne: true});
				let id = this.id;
				let num = id.replace("theater-choice-", "");
				self.stitchVideos(num);
			});
		}
	}

	stitchVideos(num){
		let creds = this.props.app.aws.cognito.credentials;
		AWS.config.region = "us-west-2";
		let elasticTranscoder = new AWS.ElasticTranscoder({
			credentials: creds,
			region: "us-west-2"
		});
		let uuid = this.props.app.aws.cognito.user.uuid;
		var params = {
		  	PipelineId: '1507145815051-81c8c1',
			OutputKeyPrefix: ('stiched-folder/' + uuid + "/").toString(),
			Inputs: [{
				Key: 'input-folder/sfo-clip-0.mp4', 
    			FrameRate: 'auto', 
    			Resolution: 'auto', 
    			AspectRatio: 'auto', 
    			Interlaced: 'auto', 
    			Container: 'auto'		
			},{
				Key: ('input-folder/sfo-clip-' + num + ".mp4").toString(), 
    			FrameRate: 'auto', 
    			Resolution: 'auto', 
    			AspectRatio: 'auto', 
    			Interlaced: 'auto', 
    			Container: 'auto'		
			}],
			Output: {
				Key: 'sfo-stich-final.mp4',
				PresetId: '1351620000001-000010'
			}
		};
		elasticTranscoder.createJob(params, function(err, data) {
			if(err) console.log(err, err.stack); 
			else console.log(data); 
		});	
	}

	setVideoSrc(){
		let self = this;
		let creds = this.props.app.aws.cognito.credentials;
		let uuid = this.props.app.aws.cognito.user.uuid;
		AWS.config.region = "us-west-2";
		let s3 = new AWS.S3({
			credentials: creds,
			region: "us-west-2"
		});
		let params = {Bucket: 'mytv-app', Key: ('stiched-folder/' + uuid + '/sfo-stich-final.mp4').toString()};
		s3.getSignedUrl('getObject', params, function(err, url){
			if(err) console.log(err, err.stack);
			else {
				let vid = document.getElementById("theater-video");
				vid.src = url;
				vid.onloadedmetadata = function(){
					self.setState({stepTwo: true});
					document.getElementById("theater-video").removeEventListener("timeupdate", function(){}, true);
					vid.currentTime = 26;
					vid.play();
				};
			}
		});
	}

	componentDidMount(){
		let self = this;
		this.registerTheaterChoiceEvents();	
		document.getElementById('theater-video').addEventListener("timeupdate", function(){
			if(this.currentTime >= 25 && self.state.stepOne == false) {
				this.pause();
				self.showTheaterInteractions();
			}
			if(this.currentTime >= 40 && self.state.stepTwo == false){
				let vid = this;
				setTimeout(function(){
					vid.pause();
					self.setVideoSrc();
				}, 4000);
			}
		});
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
		let params = {Bucket: 'mytv-app', Key: 'stiched-folder/sfo-intro-clip.mp4'};
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
										Choice 1
									</div>
								</div>
								<div id="theater-choice-2" className="theater-choice">
									<div className="theater-choice-thumbnail">
										<img src="/public/img/day1.jpg" alt="day1"/>
									</div>
									<div className="theater-choice-title">
										Choice 2
									</div>
								</div>
								<div id="theater-choice-3" className="theater-choice">
									<div className="theater-choice-thumbnail">
										<img src="/public/img/day1.jpg" alt="day1"/>
									</div>
									<div className="theater-choice-title">
										Choice 3
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
