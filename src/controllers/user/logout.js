const User = require('../../model/user.model');

const logout = (req, res) => {
	const userId = req.user.id;

	const sendResponse = user => {
		res.json({
			status: 'success',
			message: `User ${user} exit`,
		});
	};

	const sendError = error => {
		let errMessage = "User doesn't exist";

		if (error.message) {
			errMessage = error.message;
		}
		res.status(403).json({
			status: 'error',
			message: errMessage,
		});
	};

	User.findByIdAndUpdate(userId, { $unset: { token: null } }, { new: true })
		.then(resp => {
			sendResponse(resp.nickname);
		})
		.catch(sendError);
};

module.exports = logout;
