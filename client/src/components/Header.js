import React, { Component } from 'react';
import { logoutUser } from '../utils/auth';

class Header extends Component {
	logout(e){
		e.preventDefault();
		logoutUser();	
	}

	render(){
		return (
			<div id="header">
				<div className="brand-container">
					<div className="brand">
						<div className="brand-logo">
							<img src="/public/img/white-tv.png" alt=""/>
						</div>
						<div className="brand-text">MyTV</div>
					</div>
				</div>
				<div className="signout">
					<span onClick={this.logout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i></span>
				</div>
				<div className="user-container">
					<div className="user-avatar">
						<img src="https://api.adorable.io/avatars/55/abott@adasdforable.io.png" alt="avatar" />
					</div>
					<div className="user-name">
						<span id="username"></span>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;