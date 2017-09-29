import React, { Component } from 'react';

class Home extends Component {
	render(){
		return (
			<div id="theater">
				<div id="brand-container">
					<div id="brand">MyTV</div>
				</div>
				<video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay muted></video>
			</div>
		);
	}
}

export default Home;
