import express from 'express';
const router = express.Router();
const cognito = require('amazon-cognito-identity-js');

//import AWS from 'aws-sdk';

//AWS.config.region = "us-west-2";
//let cs = new AWS.CognitoIdentityServiceProvider();

let ClientId = "2pr7esv3j45mdncji036h3rers";
let UserPoolId = "us-west-2_gi5wmIvY0";

let poolData = {
	UserPoolId: UserPoolId,
	ClientId: ClientId
};

router.post('/', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	let userPool = new cognito.CognitoUserPool(poolData);	

	userPool.signUp(email, password, [], null, (err, result) => {
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

	//var params = {
	//	ClientId: ClientId,
	//	Password: password,
	//	Username: email
	//};
	// Send email and password for account creation	
	//cs.signUp(params, function(err, data){
	//	if(err) res.status(400).send({"error": true});
	//	else res.status(200).send({"success": "true"});
	//});
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
	
	let params = {
		ClientId: ClientId,
		ConfirmationCode: code,
		Username: email
	};
	// Send confirmation code w/ email to confirm account creation
	cs.confirmSignUp(params, (err, data) => {
		if(err) res.status(400).send({"error": true});
		else {
			console.log(data);	
			res.status(200).send({"success": true});
		}
	});
});

router.options('/confirm', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
	res.header("Access-Control-Max-Age", 86400);
	res.sendStatus(200);
});

export default router;
