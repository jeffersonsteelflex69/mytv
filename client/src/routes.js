import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './pages/App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Theater from './pages/Theater';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Confirmation from './pages/Confirmation';
import Layout from './pages/Layout';
//import AuthRequired from './utils/AuthRequired';

export default (
	<Router history={browserHistory}>
		<Route component={App}>
			<Route component={Layout} >
				<Route path="/" component={Home}/>
				<Route path="/video" component={Theater}/>
				<Route path="/login" component={Login}/>
				<Route path="/logout" component={Logout}/>
				<Route path="/register" component={Register}/>
				<Route path="/register/confirmation" component={Confirmation}/>
			</Route>
		</Route>
		<Route path="*" component={NotFound} />
	</Router>
);	

