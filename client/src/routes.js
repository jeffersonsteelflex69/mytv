import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './pages/App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Theater from './pages/Theater';
import Login from './pages/Login';

export default (
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/" component={Home}/>
			<Route path="/video" component={Theater}/>
			<Route path="/login" component={Login}/>
		</Route>
		<Route path="*" component={NotFound} />
	</Router>
);
