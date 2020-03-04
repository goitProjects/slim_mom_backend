const checkCreateNewEated = (req, res, next) => {
	const userProductSelected = req.params.productId;
	const userProductWeight = req.body.weight;

	const sendError = err => {
		res.status(400).json({
			status: 'error',
			message: err,
			example: {
				weight: 20,
				date: 213213123,
			},
		});
	};

	if (
		req.headers[`content-type`].match(/application\/json/)[0] !==
		`application/json`
	) {
		sendError('request content-type must be application/json only'); // Пропускаем только json
		return;
	}
	if (!userProductSelected) {
		sendError('Productid is required as query');
		return;
	}
	if (!userProductWeight) {
		sendError('Eated product weight is required ');
		return;
	}

	next();
};

module.exports = checkCreateNewEated;
