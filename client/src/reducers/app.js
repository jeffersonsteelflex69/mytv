import {
	SET_AWS_COGNITO_USER_POOL,
	STORE_COGNITO_USER,
	STORE_COGNITO_USER_ATTRIBUTE,
	STORE_COGNITO_USER_CREDENTIALS,
	SET_AUTHENTICATED
} from '../actions/app';

const INITIAL_STATE = {
	aws: {
		cognito: {
			region: "us-west-2",
			clientId: "2pr7esv3j45mdncji036h3rers",
			userPoolId: "us-west-2_gi5wmIvY0",
			userPoolURL: "cognito-idp.us-west-2.amazonaws.com/us-west-2_gi5wmIvY0",
			userPool: null,
			cognitoUser: null,
			credentials: null,
			user: {
				uuid: "",
				email: ""
			}
		}
	},
	isAuthenticated: false
};

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case SET_AWS_COGNITO_USER_POOL:
			return {
				...state,
				aws: {
					cognito: {
						...state.aws.cognito,
						userPool: action.payload
					}
				}
			};
		case STORE_COGNITO_USER:
			return {
				...state,
				aws: {
					cognito: {
						...state.aws.cognito,
						cognitoUser: action.payload
					}
				}
			};
		case STORE_COGNITO_USER_ATTRIBUTE:
			return {
				...state,
				aws: {
					cognito: {
						...state.aws.cognito,
						user: {
							...state.aws.cognito.user,
							...action.payload
						}
					}	
				}
			};
		case STORE_COGNITO_USER_CREDENTIALS:
			return {
				...state,
				aws: {
					cognito: {
						...state.aws.cognito,
						credentials: action.payload
					}	
				}
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: action.payload
			};
		default:
			return state;
	}
};
