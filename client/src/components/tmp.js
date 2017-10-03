import AWS from 'aws-sdk';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

AWS.config.region = "us-west-2";
					
let idp = {};
idp[userPoolURL] = result.getIdToken().getJwtToken();

let creds = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: 'us-west-2:4720dfe6-8515-477e-97bd-7e3764154b84',
	Logins: {
		...idp
	}
},{
	region: "us-west-2"	
});
creds.refresh(function(err, data){
	if(err) console.log(err);
	else console.log(creds);
});
