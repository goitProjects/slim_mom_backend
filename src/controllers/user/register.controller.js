const bcrypt = require('bcrypt');
const User = require('../../model/user.model');

const register = (req, res) => {
	const user = req.body;

	const sendResponse = data => {
		res.json({
			status: 'success',
			user: data,
		});
	};

	const sendError = error => {
		let errMessage = 'user was not saved';
		// console.log('user err', error);
		if (error && error.message && !error.code) {
			errMessage = error.message;
		} else if (
			error &&
			error.code === 11000 &&
			error.errmsg.includes('email')
		) {
			errMessage = 'email already exist';
		} else if (
			error &&
			error.code === 11000 &&
			error.errmsg.includes('nickname')
		) {
			errMessage = 'nickname already exist';
		}

		res.status(400).json({
			status: 'error',
			message: errMessage,
		});
	};

	const newUserData = {
		...user,
		password: bcrypt.hashSync(user.password.trim(), 10),
	};

	const newUser = new User(newUserData);

	newUser
		.save()
		.then(userFromDB => {
			userFromDB
				.createNewToken() // Добавляем новый токен
				.then(token => {
					const resp = {
						nickname: userFromDB.nickname,
						token,
						userData: userFromDB.userData,
						createdAt: userFromDB.createdAt,
					};
					sendResponse(resp);
				})
				.catch(sendError);
		})
		.catch(sendError);
};

module.exports = register;
