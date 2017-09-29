import React, { Component } from 'react';
import '../styles/app.sass';

class App extends Component {
	render(){
		if(true){
			return(
				<div className="mytv-container">
					<div className="home-background"></div>
					<div className="overlay"></div>
					{ this.props.children }
				</div>
			);
		} else {
			return(
				<div className="mytv-container">
					{ this.props.children }
				</div>
			);
		}
	}	
}

export default App;
