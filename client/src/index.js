import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './styles/app.sass';

import router from './routes';

render(
	<Provider store={store}>
		{ router }
	</Provider>,
	document.getElementById("mytv")
);
