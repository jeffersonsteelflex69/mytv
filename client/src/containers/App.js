import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { setAWSCognitoUserPool } from '../actions/app';

const mapDispatchToProps = (dispatch) => {
	return {
		setAWSCognitoUserPool: (userPoolId, clientId) => {
			let poolData = {
				UserPoolId: userPoolId,
				ClientId: clientId
			};
			let userPool = new CognitoUserPool(poolData);	
			dispatch(setAWSCognitoUserPool(userPool));
		}	
	};
};

function mapStateToProps(state, ownProps){
	return {
		app: state.app
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
