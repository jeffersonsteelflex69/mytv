import React, { Component } from 'react';
import Landing from './Landing';

class Layout extends Component {
	setAuthenticated(state){
		this.props.setAuthenticated(state);		
	}

	componentWillMount(){
		let location = window.location.pathname;
		let self = this;
		let userPool = this.props.app.aws.cognito.userPool;
		let cognitoUser = userPool.getCurrentUser();
		if(cognitoUser !== null){
			if(location == "/login" || location == "/register" || location == "/register/confirmation"){
				this.setAuthenticated(true);
				this.context.router.push("/");
				return;
			}
			this.setAuthenticated(true);
			return
		} else {
			if(location == "/"){
				this.setAuthenticated(false);
				return;	
			}
			this.setAuthenticated(false);
		}	
	}

	render(){
		if(this.props.app.isAuthenticated == false){
			if(window.location.pathname == "/"){
				return(
					<div className="mytv-container">
						<div className="home-background"></div>
						<div className="overlay"></div>
						<Landing {...this.props}/>
					</div>
				);
			} else {
				return(
					<div className="mytv-container">
						<div className="home-background"></div>
						<div className="overlay"></div>
						{ this.props.children }
					</div>
				);
			}
		} else {
			return(
				<div className="mytv-container">
					{ this.props.children }
				</div>
			);
		}	
	}
}

Layout.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Layout;