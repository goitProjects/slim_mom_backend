const Products = require('../../model/products.model');
const UserEated = require('../../model/userEated.model');
const User = require('../../model/user.model');
const errors = require('../../config').errors.products;

const createUserEated = async (req, res) => {
	const userId = req.user._id;
	const userProductSelected = req.params.productId;
	const userProductWeight = req.body.weight;
	const { date } = req.body;
	const { dailyRate } = req.body;

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

	const sendResponse = products => {
		res.status(201).json({
			status: `success`,
			products,
		});
	};

	Products.findOne({ _id: userProductSelected })
		.then(findProduct => {
			return {
				title: findProduct.title,
				basicCalories: findProduct.calories,
				basicWeight: findProduct.weight,
				calories: (findProduct.calories * (userProductWeight / 100)).toFixed(1),
				weight: userProductWeight,
				groupBloodNotAllowed: findProduct.groupBloodNotAllowed,
				createdDate: date,
				userId,
				dailyRate,
			};
		})
		.then(eatedProduct => {
			UserEated.create(eatedProduct)
				.then(newRecord => {
					User.findByIdAndUpdate(
						userId,
						{
							$push: { eatsRecorded: newRecord._id },
						},
						{ new: true },
					)
						.lean()
						.then(() => {
							const resp = {
								title: newRecord.title,
								weight: newRecord.weight,
								calories: newRecord.calories,
								_id: newRecord._id,
							};

							sendResponse(resp);
						})
						.catch(sendError);
				})

				.catch(sendError);
		})
		.catch(sendError);
};

module.exports = createUserEated;
