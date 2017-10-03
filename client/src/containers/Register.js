import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../components/Register';

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (userPool, email, password) => {
			console.log(userPool, email, password);
			userPool.signUp(email, password, [], null, function(err, result){
				if(err) {
					let error = document.getElementById("error");
					error.style.display = "block";
					error.innerHTML = err.message;
					return;
				}
				alert("Successfully registered your account.\nCheck your email to confirm your account.");
				cognitoUser = result.user;
				console.log('user name is ' + cognitoUser.getUsername());
			});
		}	
	};
};

function mapStateToProps(state, ownProps){
	return {
		app: state.app
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
