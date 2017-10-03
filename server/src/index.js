import http from 'http';
import express from 'express';
import Debug from 'debug';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from './middleware/cors';

import routes from './routes';

const AWSCognito = require('amazon-cognito-identity-js');
let ClientId = "2pr7esv3j45mdncji036h3rers";
let UserPoolId = "us-west-2_gi5wmIvY0";
let poolData = {
	UserPoolId: UserPoolId,
	ClientId: ClientId
};
let userPool = new AWSCognito.CognitoUserPool(poolData);	

let app = express();
let debug = Debug('MyTV:app');

app.use((req, res, next) => {
	res.locals.userPool = userPool;
	next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);
app.disable('etag');
app.use("/api/v1", routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.json(err);
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
