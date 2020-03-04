const errors = require(`../config`).errors.calc;

const checkCalcReq = (req, res, next) => {
	const { height, currentWeight, age, desiredWeight } = req.body;

	const sendError = (err, code) => {
		const statusCode = code || 400;
		const message =
			err || `middleware check username & password exist in req is bugy`;

		res.status(statusCode).json({
			err: message,
			example: {
				age: 29,
				height: 170,
				currentWeight: 80.3,
				desiredWeight: 50.5,
			},
		});
	};

	if (req.headers[`content-type`] !== `application/json`) {
		sendError(errors.onlyJson); // Пропускаем только json
		return;
	}
	if (!age && !height && !currentWeight && !desiredWeight) {
		sendError(errors.allFieldsAreRequired);
	}
	if (!age) {
		sendError(errors.ageIsRequired);
		return;
	}
	if (!height) {
		sendError(errors.heightIsRequired);
		return;
	}
	if (!currentWeight) {
		sendError(errors.currentWeightIsRequired);
		return;
	}
	if (!desiredWeight) {
		sendError(errors.desiredWeight);
		return;
	}
	if (typeof desiredWeight !== 'number' || typeof currentWeight !== 'number') {
		sendError(errors.weightNum);
		return;
	}
	if (!Number.isInteger(age) || !Number.isInteger(height)) {
		sendError(errors.ageHeightCeilNum);
		return;
	}
	if (age < 1 || age > 99) {
		sendError(errors.ageRange);
		return;
	}
	if (height < 1 || height > 230) {
		sendError(errors.heightRange);
		return;
	}
	if (
		currentWeight < 1 ||
		currentWeight > 230 ||
		desiredWeight < 1 ||
		desiredWeight > 230
	) {
		sendError(errors.weightRange);
		return;
	}

	if (currentWeight < desiredWeight) {
		sendError(errors.onlyLosingWeight);
		return;
	}

	next();
};

module.exports = checkCalcReq;
