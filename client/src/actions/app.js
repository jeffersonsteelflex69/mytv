export const SET_AWS_COGNITO_USER_POOL = "SET_AWS_COGNITO_USER_POOL";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

export function setAWSCognitoUserPool(userPool){
	return {
		type: SET_AWS_COGNITO_USER_POOL,
		payload: userPool
	}
};

export function setAuthenticated(state){
	return {
		type: SET_AUTHENTICATED,
		payload: state
	}
};

