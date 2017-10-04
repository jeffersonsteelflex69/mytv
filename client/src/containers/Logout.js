import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from '../components/Logout';

function mapStateToProps(state, ownProps){
	return {
		app: state.app	
	};
}

export default connect(mapStateToProps)(Logout);
