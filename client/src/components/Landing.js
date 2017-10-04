import React, { Component } from 'react';
import { Link } from 'react-router';

class Landing extends Component {
	render(){
		return (
			<div id="home">
				<div className="home-container">
					<div className="brand-container">
						<div className="brand">
							<div className="brand-logo">
								<img src="/public/img/white-tv.png" alt=""/>
							</div>
							<div className="brand-text">MyTV</div>
							<div className="brand-slogan">As seen on Shark Tank</div>
							<div className="actions-container">
								<div className="actions-register">
									<Link to="/register">Register</Link>
								</div>
								<div className="actions-login">
									<Link to="/login">Login</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
