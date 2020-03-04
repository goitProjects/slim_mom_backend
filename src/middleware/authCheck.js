const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const { secret } = require(`../config`);
const SECRET_KEY = process.env.SECRET_KEY_FOR_JWT || secret;

const authCheck = (req, res, next) => {
	const token = req.headers.authorization;

	const sendError = err => {
		res.status(400).json({
			status: `error`,
			message: err.message,
		});
	};

	if (token) {
		const clearToken = token.replace(`Bearer `, ``);

		jwt.verify(clearToken, SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(401).json({
					status: 'error',
					message: err.message,
				});
			}
			User.findById({ _id: decoded.userId })
				.then(findUser => {
					if (findUser === null) {
						res.status(401).json({
							status: 'error',
							message: 'user not auth',
						});
					}
					if (!findUser.token) {
						res.status(401).json({
							status: 'error',
							message: 'token doesnt exist',
						});
					}

					req.user = findUser;
					next();
				})
				.catch(sendError);
		});
	} else {
		res.status(401).json({
			status: `error`,
			message: `Not Authorization field in header`,
		});
	}
};

module.exports = authCheck;
