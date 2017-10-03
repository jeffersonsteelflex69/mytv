import React, { Component } from 'react';

class App extends Component {
	setAWSCognitoUserPool(){
		let userPoolId = this.props.app.aws.cognito.userPoolId;
		let clientId = this.props.app.aws.cognito.clientId;
		this.props.setAWSCognitoUserPool(userPoolId, clientId);	
	}

	componentWillMount(){
		this.setAWSCognitoUserPool();	
	}

	render(){
		if(this.props.app.isAuthenticated == false){
			return(
				<div className="mytv-container">
					<div className="home-background"></div>
					<div className="overlay"></div>
					{ this.props.children }
				</div>
			);
		} else {
			return(
				<div className="mytv-container">
					{ this.props.children }
				</div>
			);
		}
	}	
}

export default App;
