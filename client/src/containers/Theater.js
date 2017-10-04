import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theater from '../components/Theater';

function mapStateToProps(state, ownProps){
	return {
		app: state.app	
	};
}

export default connect(mapStateToProps)(Theater);
