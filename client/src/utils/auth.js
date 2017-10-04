import store from '../store';

function getUserPool(){
	return (store.getState()).app.aws.cognito.userPool;
}

function clearLocalStorage(){
	localStorage.clear();	
}

export function logoutUser(){
	let self = this;	
	let userPool = getUserPool();
	let cognitoUser = userPool.getCurrentUser();
	
	if (cognitoUser != null) {
		cognitoUser.getSession(function(err, session) {
			if (err) {
				alert(err);
				return;
			}
			if(session.isValid()){
				cognitoUser.globalSignOut();
				clearLocalStorage();
				window.location.href = "/";
			}
		});
	}
	clearLocalStorage();
	window.location.href = "/";
}
