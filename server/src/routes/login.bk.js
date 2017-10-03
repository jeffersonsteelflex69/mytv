import express from 'express';
const router = express.Router();
import AWS from 'aws-sdk';

AWS.config.region = "us-west-2";
let cs = new AWS.CognitoIdentityServiceProvider();
let ClientId = "2pr7esv3j45mdncji036h3rers";

router.post('/', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	
	let authData = {
		Username: email,
		Password: password
	};
	let authDetails = cs.AuthenticationDetails(authData);
	let poolData = {
		UserPoolId: "us-west-2_gi5wmIvY0",
		ClientId: ClientId
	};
	
	let userPool = new cs.CognitoUserPool(poolData);
	let userData = {
		Username: email,
		Pool: userPool
	};

	let cu = new cs.CognitoUser(userData);
	cu.authenticateUser(authDetails, {
		onSuccess: function(result){
			console.log('access token + ' + result.getAccessToken().getJwtToken());	
			res.status(200).send("works login");
		},
		onFailure: function(err){
			console.log(err);
			res.status(400).send("not working");
		}
	});

});

router.options('/', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
	res.header("Access-Control-Max-Age", 86400);
	res.sendStatus(200);
});

export default router;
