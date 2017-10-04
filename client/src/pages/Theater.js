import React, { Component } from 'react';
import TheaterContainer from '../containers/Theater';

class Theater extends Component {
	render(){
		return (
			<TheaterContainer { ...this.props } />
		);
	}
}

export default Theater;
