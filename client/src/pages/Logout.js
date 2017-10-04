import React, { Component } from 'react';
import LogoutContainer from '../containers/Logout';

class Logout extends Component {
	render(){
		return (
			<LogoutContainer {...this.props }/>	
		);
	}
}

export default Logout;
