import express from 'express';
const router = express.Router();
const AWSCognito = require('amazon-cognito-identity-js');

router.post('/', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	
	let authData = {
		Username: email,
		Password: password
	};
	let authDetails = new AWSCognito.AuthenticationDetails(authData);
	let userData = {
		Username: email,
		Pool: res.locals.userPool
	};

	let cu = new AWSCognito.CognitoUser(userData);
	cu.authenticateUser(authDetails, {
		onSuccess: function(result){
			console.log('access token + ' + result.getAccessToken().getJwtToken());
			let cognitoUser = res.locals.userPool.getCurrentUser();
			console.log(cognitoUser);
			res.status(400).send("asdf");
		},
		onFailure: function(err){
			console.log(err);
			res.status(400).send("not working");
		}
	});
});

router.delete('/', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	
	let userData = {
		Username: email,
		Pool: res.locals.userPool
	};
	let cognitoUser = new AWSCognito.CognitoUser(userData);
	console.log("made it after");
	cognitoUser.globalSignOut({
		onSuccess: function(result){
			console.log(result);
			res.status(200).send("works");
		},
		onFailure: function(err){
			console.log(err);
			res.status(400).send("oops");
		}
	});
});

router.options('/', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
	res.header("Access-Control-Max-Age", 86400);
	res.sendStatus(200);
});

export default router;
