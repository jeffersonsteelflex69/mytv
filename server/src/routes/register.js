import express from 'express';
const router = express.Router();
const AWSCognito = require('amazon-cognito-identity-js');

router.post('/', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	res.locals.userPool.signUp(email, password, [], null, (err, result) => {
		if(err){
			console.log(err);
			return res.status(400).send({"error": {
				"code": err.code,
				"message": err.message
			}});
		}
		console.log(result);
		res.status(200).send({"success": "true"});
	});
});

router.options('/', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
	res.header("Access-Control-Max-Age", 86400);
	res.sendStatus(200);
});

router.post('/confirm', (req, res) => {
	let email = req.body.email;
	let code = req.body.confirmationCode;
	
	let userData = {
		Username: email,
		Pool: res.locals.userPool
	};

	let cognitoUser = new AWSCognito.CognitoUser(userData);
	cognitoUser.confirmRegistration(code, true, (err, result) => {
		if(err){
			console.log(err);
			return res.status(400).send(err);
		}
		console.log(cognitoUser.getUsername());
		console.log('call result: ' + result);
		console.log(cognitoUser);
		res.status(200).send(result);
	});
});

router.options('/confirm', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
	res.header("Access-Control-Max-Age", 86400);
	res.sendStatus(200);
});

export default router;
