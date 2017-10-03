import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Login from '../components/Login';

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (userPool, userPoolId, userPoolURL, email, password) => {
			let authData = {
				Username : email,
				Password : password,
			};
			let authDetails = new AuthenticationDetails(authData);
			let userData = {
				Username : email,
				Pool : userPool
			};
			let cognitoUser = new CognitoUser(userData);
			cognitoUser.authenticateUser(authDetails, {
				onSuccess: function (result) {
					alert("you are logged in");
					window.location.href = "/";
				},
				onFailure: function(err) {
					let error = document.getElementById("error");
					error.style.display = "block";
					error.innerHTML = err.message;
				}
			});	
		}	
	};
};

function mapStateToProps(state, ownProps){
	return {
		app: state.app
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
