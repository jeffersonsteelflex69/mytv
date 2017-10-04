import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { setAuthenticated } from '../actions/app';

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthenticated: (state) => {
			dispatch(setAuthenticated(state));	
		}		
	};
};

function mapStateToProps(state, ownProps){
	return {
		app: state.app	
	};	
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
