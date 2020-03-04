const User = require('../../model/user.model');

const updateUser = (req, res) => {
	const userId = req.user.id;
	const newUserData = req.body;

	const sendResponse = userData => {
		res.json({
			status: `success`,
			userData,
		});
	};

	const sendError = err => {
		res.status(400).json({
			status: 'error',
			message: err.message,
		});
	};

	User.findByIdAndUpdate(
		userId,
		{ $set: { userData: newUserData } },
		{ new: true },
	)
		.then(newUser => {
			const { userData } = newUser;
			sendResponse(userData);
		})
		.catch(sendError);
};

module.exports = updateUser;
