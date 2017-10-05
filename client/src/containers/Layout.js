import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import AWS from 'aws-sdk';
import { setAuthenticated, storeCognitoUser, storeCognitoUserAttribute, storeCognitoUserCredentials } from '../actions/app';

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthenticated: (state) => {
			dispatch(setAuthenticated(state));	
		},
		storeCognitoUser: (cognitoUser) => {
			dispatch(storeCognitoUser(cognitoUser));	
		},
		storeCognitoUserAttribute: (attribute) => {
			dispatch(storeCognitoUserAttribute(attribute));	
		},
		storeCognitoUserCredentials: (credentials) => {
			dispatch(storeCognitoUserCredentials(credentials));	
		}
	};
};

function mapStateToProps(state, ownProps){
	return {
		app: state.app	
	};	
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
