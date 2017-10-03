import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/app.sass';

import router from './routes';
const store = configureStore();

render(
	<Provider store={store}>
		{ router }
	</Provider>,
	document.getElementById("mytv")
);
