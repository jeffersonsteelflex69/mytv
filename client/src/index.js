import React from 'react';
import { render } from 'react-dom';

import router from './routes';
console.log(router);
render(
	router,
	document.getElementById("mytv")
);
