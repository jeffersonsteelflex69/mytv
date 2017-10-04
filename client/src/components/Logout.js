import React, { Component } from 'react';
import { Link } from 'react-router';
import { logoutUser } from '../utils/auth';

class Logout extends Component {
	componentDidMount(){
		logoutUser();
	}

	render(){
		return (
			<div id="logout">Logging Out</div>	
		);
	}
}

export default Logout;
