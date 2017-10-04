import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Confirmation from '../components/Confirmation';

const mapDispatchToProps = (dispatch) => {
	return {
		confirmUser: (userPool, email, code) => {
			let userData = {
				Username: email,
				Pool: userPool
			};

			let cognitoUser = new CognitoUser(userData);
			cognitoUser.confirmRegistration(code, true, function(err, result) {
				let error = document.getElementById("error");
				if (err) {
					error.style.display = "block";
					error.innerHTML = err.message;
					return;
				}
				error.style.display = "block";
				error.style.color = "green";
				error.innerHTML = "Successfully confirmed your account";
				setTimeout(() => {
					window.location.href = "/";	
				}, 2000);	
			});		
		}	
	};
};

function mapStateToProps(state, ownProps){
	return {
		app: state.app	
	};
}

Confirmation.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
