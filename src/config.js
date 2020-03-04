// const dbUser = 'admin';
// const dbPassword = 'admin';

const config = {
	port: 8081,
	// databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-hpf7b.mongodb.net/test?retryWrites=true&w=majority`,
	databaseUrl: `mongodb+srv://slims:goit34GH@healthproject-hrchz.mongodb.net/test?retryWrites=true&w=majority`,
	secret: `secret key`,
	errors: {
		auth: {
			userRequired: `nickname is reqaaauired`,
			userExist: 'User doesnt exist',
			passInvalid: `Password is invalid`,
			passRequired: `password is required`,
			passAndUserRequired: `nickname and password is required`,
			onlyJson: `request content-type must be application/json only`,
			passInvalidLength: 'Password must be at last 5 charecters',
		},
		calc: {
			allFieldsAreRequired: 'All fields are required!',
			ageHeightCeilNum: 'Age and height must be a ceil Number!',
			weightNum: 'Weight must be a Number!',
			ageIsRequired: 'Age is required!',
			ageRange: 'Age must be in range 1-99',
			heightIsRequired: 'Height is required!',
			heightRange: `Height must be in range 1-230`,
			currentWeightIsRequired: 'Current weight is required!',
			desiredWeight: 'Desired weight is required!',
			weightRange: 'Weight must be in range 1-199',
			onlyJson: `request content-type must be application/json only`,
			onlyLosingWeight: 'Desired weight cant be bigget then current',
		},
		products: {
			doestExist: 'No such product',
		},
	},
	tokenLifeTime: `30d`,
};

module.exports = config;
