export const SET_AWS_COGNITO_USER_POOL = "SET_AWS_COGNITO_USER_POOL";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const STORE_COGNITO_USER = "STORE_COGNITO_USER";
export const STORE_COGNITO_USER_ATTRIBUTE = "STORE_COGNITO_USER_ATTRIBUTE";
export const STORE_COGNITO_USER_CREDENTIALS = "STORE_COGNITO_USER_CREDENTIALS";

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

export function storeCognitoUser(cognitoUser){
	return {
		type: STORE_COGNITO_USER,
		payload: cognitoUser
	};
};

export function storeCognitoUserAttribute(attribute){
	return {
		type: STORE_COGNITO_USER_ATTRIBUTE,
		payload: attribute
	};
};

export function storeCognitoUserCredentials(credentials){
	return {
		type: STORE_COGNITO_USER_CREDENTIALS,
		payload: credentials
	};
};
