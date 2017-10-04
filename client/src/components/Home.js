import React, { Component } from 'react';
import AWS from 'aws-sdk';

class Home extends Component {
	componentDidMount(){
		this.getShowThumbnail();	
	}

	viewShow(e){
		e.preventDefault();
		//this.context.router.push("/video");	
		window.location.href = "/video";
	}

	getShowThumbnail(){
		let userPool = this.props.app.aws.cognito.userPool;
		let userPoolURL = this.props.app.aws.cognito.userPoolURL;
		let cognitoUser = userPool.getCurrentUser();
		if(cognitoUser != null) {
			cognitoUser.getSession(function(err, session) {
				if (err) {
					alert(err);
					return;
				}
				let idp = {};
				idp[userPoolURL] = session.getIdToken().getJwtToken();

				AWS.config.region = "us-west-2";
				let creds = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: 'us-west-2:4720dfe6-8515-477e-97bd-7e3764154b84',
					Logins : {
						...idp
					}
				}, {
					region: "us-west-2"	
				});

				creds.refresh(function(err, data){
					if(err) console.log("yo", err, err.stack);
					else {
						let s3 = new AWS.S3({
							credentials: creds,
							region: "us-west-2"
						});
						let params = {Bucket: 'mytv-app', Key: 'show-thumbnails/techu-cohort-1-sfo.jpg'};
						s3.getSignedUrl('getObject', params, function(err, url){
							if(err) console.log(err, err.stack);
							else {
								console.log(url);
								document.getElementById("show-thumbnail").src = url;
							}
						});
					}
				});
			});
		}	
	}

	render(){
		return (
			<div id="home">
				<div className="shows-container">
					<div className="shows-header">
						Shows
					</div>
					<div className="shows">
						<div className="show" onClick={this.viewShow.bind(this)}>
							<div className="show-thumbnail">
								<div className="show-thumbnail-overlay">
									<span className="show-thumbnail-overlay-button"><i className="fa fa-arrow-right"></i></span>	
								</div>
								<img id="show-thumbnail" src=""/>
							</div>
							<div className="show-details">
								<div className="show-title">
									TechU Cohort 1 - SFO
								</div>
								<div className="show-description">
									Video about the TechU Cohort 1 SFO team
								</div>
								<div className="show-date">
									<span>Released: </span>August 21, 2017
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		);
	}
}

Home.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Home;
