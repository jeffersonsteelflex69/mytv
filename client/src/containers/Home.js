import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

function mapStateToProps(state, ownProps){
	return {
		app: state.app	
	};
}

export default connect(mapStateToProps)(Home);
