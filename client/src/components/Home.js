import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';

class Home extends Component {
	checkHomeFolderExists(){
		let creds = this.props.app.aws.cognito.credentials;
		let cognitoUser = this.props.app.aws.cognito.cognitoUser;
		AWS.config.region = "us-west-2";
		let s3 = new AWS.S3({
			credentials: creds,
			region: "us-west-2"
		});
		let params = {Bucket: 'mytv-app', Key: ('stiched-folder/' + cognitoUser.getUsername() + "/").toString()};
		s3.headObject(params, function(err, metaData){
			if(err && err.code == "NotFound"){
				s3.putObject({Bucket: "mytv-app", Key: ('stiched-folder/' + cognitoUser.getUsername() + "/").toString()}, function(err, data){
					if(err) return console.log(err, err.stack);
					else return console.log("Successfully created user folder", data);
				});
			} else {
				s3.listObjects({Bucket: "mytv-app", Prefix: ("stiched-folder/" + cognitoUser.getUsername()).toString()}, function(err, data){
					if(err) return console.log(err, err.stack);
					if(data.Contents.length == 0) return console.log("nothing inside this folder");
					let params = {Bucket: "mytv-app"};
					params.Delete = {Objects:[]};

					data.Contents.forEach(function(content){
						params.Delete.Objects.push({Key: content.Key});	
					});

					s3.deleteObjects(params, function(err, data){
						if(err) return console.log(err);
						else return console.log("Emptied the user folder");	
					});
				});
			}
		});
	}

	viewShow(e){
		e.preventDefault();
		window.location.href = "/video";
	}

	componentWillReceiveProps(nextProps){
		let self = this;
		if(nextProps.app.aws.cognito.credentials != null){
			setTimeout(function(){
				self.getShowThumbnail();
				self.checkHomeFolderExists();
			}, 250);
		}
	}

	getShowThumbnail(){
		/*
		let creds = this.props.app.aws.cognito.credentials;
		AWS.config.region = "us-west-2";
		let s3 = new AWS.S3({
			credentials: creds,
			region: "us-west-2"
		});
		let params = {Bucket: 'mytv-app', Key: 'show-thumbnails/day1.jpg'};
		s3.getSignedUrl('getObject', params, function(err, url){
			if(err) return console.log(err, err.stack);
			else document.getElementById("show-thumbnail").src = url;
		});*/
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
								<img id="show-thumbnail" src="/public/img/day1.jpg"/>
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
	router: PropTypes.object.isRequired
};

export default Home;
