import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../components/Register';

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (userPool, email, password) => {
			console.log(userPool, email, password);
			userPool.signUp(email, password, [], null, function(err, result){
				let error = document.getElementById("error");
				if(err) {
					error.style.display = "block";
					error.innerHTML = err.message;
					return;
				}
				error.style.display = "block";
				error.style.color = "green";
				error.innerHTML = "Successfully registered your account";
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
