import React, { Component } from 'react';
import { connect } from 'react-redux';
import Landing from '../pages/Landing';
import { setAuthenticated } from '../actions/app';

export default function(ComposedComponent){
	class Authenticate extends Component {
		setAuthenticated(state){
			this.props.setAuthenticated(state);		
		}

		componentWillMount(){
			/*
			let location = window.location.pathname;
			console.log(location);
			let self = this;
			let userPool = this.props.app.aws.cognito.userPool;
			let cognitoUser = userPool.getCurrentUser();
			if(cognitoUser !== null){
				this.setAuthenticated(true);
				return
			} else {
				if(location == "/"){
					return;	
				}
				if(!location == "/"){
					self.context.router.push("/login");	
				}
			}	
			*/
		}
		
		componentWillUpdate(nextProps){
			/*
			let location = window.location.pathname;
			let userPool = this.props.app.aws.cognito.userPool;
			let cognitoUser = userPool.getCurrentUser();
			if(location == "/"){
				return;	
			}
			if(cognitoUser == null){
				this.context.router.push("/login");			
			}
			*/
		}

		render(){
			if(this.props.app.isAuthenticated === false){
				return (
					<ComposedComponent>
						<Landing { ...this.props } />
					</ComposedComponent>
				);	
			} else {
				return (
					<ComposedComponent>
						{ this.props.children }
					</ComposedComponent>
				);
			}
		}
	}

	const mapDispatchToProps = (dispatch) => {
		return {
			setAuthenticated: (state) => {
				dispatch(setAuthenticated(state));	
			},
			setAWSCognitoUserPool: (userPoolId, clientId) => {
				let poolData = {
					UserPoolId: userPoolId,
					ClientId: clientId
				};
				let userPool = new CognitoUserPool(poolData);	
				dispatch(setAWSCognitoUserPool(userPool));
			}	
		};
	};

	function mapStateToProps(state, ownProps){
		return {
			app: state.app	
		};	
	}

	Authenticate.contextTypes = {
		router: React.PropTypes.object.isRequired
	};
	
	return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
