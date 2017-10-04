import React, { Component } from 'react';
import LayoutContainer from '../containers/Layout';

class Layout extends Component {
	render() {
        return (
			<LayoutContainer>
				{ this.props.children }
			</LayoutContainer>
		);
    }
};

export default Layout;
