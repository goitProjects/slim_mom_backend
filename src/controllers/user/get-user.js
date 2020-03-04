const User = require(`../../model/user.model`);

const getUser = (req, res) => {
	const userId = req.user._id;

	const sendResponse = data => {
		res.json({
			status: 'success',
			user: data,
		});
	};

	const sendError = (err, code) => {
		const status = code || 404;

		res.status(status).json({
			err,
			message: err.massage,
		});
	};

	User.findById(userId)
		.then(user => {
			// console.log({ user });
			const respData = {
				nickname: user.nickname,
				token: user.token,
				userData: user.userData,
			};
			sendResponse(respData);
		})
		.catch(sendError);
};

module.exports = getUser;
