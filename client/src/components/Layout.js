import React, { Component } from 'react';
import Loading from './Loading';
import Landing from './Landing';
import Header from './Header';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';

class Layout extends Component {
	setAuthenticated(state){
		this.props.setAuthenticated(state);		
	}

	storeCognitoUserAttributes(cognitoUser){
		let self = this;
		cognitoUser.getSession((err, session) => {
			if(err){
				return console.log(err);
			}
			cognitoUser.getUserAttributes((err, result) => {
				if(err) {
					return console.log(err);
				}
				for(let i = 0; i < result.length; i++){
					let key = result[i].getName();
					let val = result[i].getValue();
					switch(key){
						case "email":
							self.props.storeCognitoUserAttribute({email: val});
							break;
						case "sub":
							self.props.storeCognitoUserAttribute({uuid: val});
							break;
						default:
							break;
					}
				}
			});
			self.storeCognitoUserCredentials(session);
		});	
	}
	
	storeCognitoUserCredentials(session){
		let self = this;
		let idp = {};
		let userPoolURL = this.props.app.aws.cognito.userPoolURL;
		idp[userPoolURL] = session.getIdToken().getJwtToken();

		AWS.config.region = "us-west-2";
		let credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: 'us-west-2:4720dfe6-8515-477e-97bd-7e3764154b84',
			Logins : {
				...idp
			}
		}, {
			region: "us-west-2"	
		});
		credentials.refresh((err, data) => {
			if(err) return console.log(err, err.stack);
			else
				self.props.storeCognitoUserCredentials(credentials);
		});
	}
	
	storeCognitoUser(cognitoUser){
		this.props.storeCognitoUser(cognitoUser);
		this.storeCognitoUserAttributes(cognitoUser);
	}	

	componentWillMount(){
		let location = window.location.pathname;
		let self = this;
		let userPool = this.props.app.aws.cognito.userPool;
		let cognitoUser = userPool.getCurrentUser();
		
		if(cognitoUser != null){
			this.storeCognitoUser(cognitoUser);
			if(location == "/login" || location == "/register" || location == "/register/confirmation"){
				this.setAuthenticated(true);
				this.context.router.push("/");
				return;
			}
			this.setAuthenticated(true);
			return
		} else {
			if(location == "/"){
				this.setAuthenticated(false);
				return;	
			}
			this.setAuthenticated(false);
		}	
	}

	render(){
		if(this.props.app.isAuthenticated == false){
			if(window.location.pathname == "/"){
				// Show the landing page
				return(
					<div className="mytv-container">
						<div className="home-background"></div>
						<div className="overlay"></div>
						<Landing {...this.props}/>
					</div>
				);
			} else {
				// Show the login/register/confirmation page
				return(
					<div className="mytv-container">
						<div className="home-background"></div>
						<div className="overlay"></div>
						{ this.props.children }
					</div>
				);
			}
		} else {
			// Show authenticated pages
			return(
				<div className="mytv-container">
					<Loading />
					<Header { ...this.props }/>	
					{ this.props.children }
				</div>
			);
		}	
	}
}

Layout.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Layout;
