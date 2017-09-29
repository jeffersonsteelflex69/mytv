import axios from 'axios';

class HTTPClient {
	constructor(){
		this.URL = "http://localhost:9696/api/v1";
	}

	get(path){
		return axios.get(this.URL + path);
	}

	post(path, data, config){
		return axios.post(this.URL + path, data, config);
	}
}

// Register API route handlers
class RegisterAPI extends HTTPClient {
	constructor(){
		super();
		this.createUser = this.createUser.bind(this);
		this.confirmUser = this.confirmUser.bind(this);
	}

	// POST - ["/register"]
	createUser(email, password){
		return this.post('/register', {email: email, password: password}, {});
	}

	confirmUser(email, code){
		return this.post('/register/confirm', {email: email, confirmationCode: code});	
	}
}

class API {
	constructor(){
		// Store instance of specific API classes
		this._register = new RegisterAPI();
	}
	
	// Instance of Register API route handlers
	get register(){
		return this._register;
	}
}

// Create instance here so that instance creation is not needed
// when it is imported
let api = new API();
export default api; 
