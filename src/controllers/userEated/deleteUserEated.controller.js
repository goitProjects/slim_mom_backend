const UserEated = require('../../model/userEated.model');
const User = require('../../model/user.model');
const errors = require('../../config').errors.products;

const createUserEated = async (req, res) => {
	const userId = req.user._id;
	const { productId } = req.params;
	// console.log({ productId });

	const sendResponse = () => {
		res.status(201).json({
			status: 'success',
		});
	};

	const sendError = err => {
		let message = err.message ? err.message : err;
		if (err && err.message.includes('_id')) {
			message = errors.doestExist;
		}

		res.status(400).json({
			status: 'error',
			message,
		});
	};

	// const sendError = err => {
	// 	let message = err.message ? err.message : err;
	// 	if (err && err.message.includes('_id')) {
	// 		message = errors.doestExist;
	// 	}
	// 	res.status(400).json({
	// 		status: 'error',
	// 		message,
	// 	});
	// };

	UserEated.findByIdAndRemove(productId)
		.then(() => {
			User.findByIdAndUpdate(
				userId,
				{
					$pull: { eatsRecorded: productId },
				},
				{ new: true },
			)
				.then(sendResponse)
				.catch(sendError);
		})
		.catch(sendError);
};
module.exports = createUserEated;
