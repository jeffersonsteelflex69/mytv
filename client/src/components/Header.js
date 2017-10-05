import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../utils/auth';

class Header extends Component {
	logout(e){
		e.preventDefault();
		logoutUser();	
	}

	homeRedirect(e){
		e.preventDefault();
		let location = window.location.pathname;
		if(location == "/")
			return
		//this.context.router.push("/");
		window.location.href = "/";
	}

	render(){
		return (
			<div id="header">
				<div className="brand-container">
					<div className="brand">
						<div className="brand-logo">
							<img src="/public/img/white-tv.png" alt=""/>
						</div>
						<div className="brand-text" onClick={this.homeRedirect.bind(this)}>MyTV</div>
					</div>
				</div>
				<div className="signout">
					<span onClick={this.logout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i></span>
				</div>
				<div className="user-container">
					<div className="user-avatar">
						<img id="avatar" src={`https://api.adorable.io/avatars/55/`+ this.props.app.aws.cognito.user.uuid + `.png`} alt="avatar" />
					</div>
					<div className="user-name">
						<span id="username">{this.props.app.aws.cognito.user.email}</span>
					</div>
				</div>
			</div>
		);
	}
}

Header.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Header;
