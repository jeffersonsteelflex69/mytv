import React, { Component } from 'react';
import ConfirmationContainer from '../containers/Confirmation';

class Confirmation extends Component {
	render(){
		return (
			<ConfirmationContainer { ...this.props }/>	
		);	
	}
}

export default Confirmation;
