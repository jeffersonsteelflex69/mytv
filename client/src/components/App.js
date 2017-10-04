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
		return (
			<div> { this.props.children } </div>	
		);
	}	
}

export default App;
