const { errors } = require(`../config.js`);

const checkBodyFornicknameAndPass = (req, res, next) => {
	const user = req.body;

	const sendError = (err, code) => {
		const statusCode = code || 400;
		const message =
			err || `middleware check nickname & password exist in req is bugy`;

		res.status(statusCode).json({
			status: 'error',
			message,
			example: {
				nickname: 'Pasha',
				password: 'Awesome_and_SEXY',
			},
			optional: {
				message:
					'if user register(no token in local storage) and calc calories before = userData is required! (from redux store)',
				example: {
					nickname: 'Pasha',
					password: 'Awesome_01',
					userData: {
						currentWeight: 80,
						desiredWeight: 60,
						height: 170,
						age: 25,
						calloriesPerDay: 1543.3,
						groupBlood: 1,
					},
				},
			},
		});
	};

	if (req.headers[`content-type`] !== `application/json`) {
		sendError(errors.auth.onlyJson); // Пропускаем только json
		return;
	}
	if (!user.nickname && !user.password) {
		sendError(errors.auth.passAndUserRequired); // Если нет nickname и password то шлем ошибку
		return;
	}
	if (!user.nickname) {
		sendError(errors.auth.userRequired); // Если нет nickname то шлем ошибку
		return;
	}
	if (!user.password) {
		sendError(errors.auth.passRequired); // Если нет Password то шлем ошибку
		return;
	}
	if (user.password.length < 5) {
		sendError(errors.auth.passInvalidLength); // Если нет Password то шлем ошибку
		return;
	}
	if (user.userData) {
		const { height, currentWeight, age, desiredWeight } = req.body.userData;
		if (!age && !height && !currentWeight && !desiredWeight) {
			sendError(errors.calc.allFieldsAreRequired);
		}
		if (!age) {
			sendError(errors.calc.ageIsRequired);
			return;
		}
		if (!height) {
			sendError(errors.calc.heightIsRequired);
			return;
		}
		if (!currentWeight) {
			sendError(errors.calc.currentWeightIsRequired);
			return;
		}
		if (!desiredWeight) {
			sendError(errors.calc.desiredWeight);
			return;
		}
		if (
			typeof desiredWeight !== 'number' ||
			typeof currentWeight !== 'number'
		) {
			sendError(errors.calc.weightNum);
			return;
		}
		if (!Number.isInteger(age) || !Number.isInteger(height)) {
			sendError(errors.calc.ageHeightCeilNum);
			return;
		}
		if (age < 1 || age > 99) {
			sendError(errors.calc.ageRange);
			return;
		}
		if (height < 1 || height > 230) {
			sendError(errors.calc.heightRange);
			return;
		}
		if (
			currentWeight < 1 ||
			currentWeight > 230 ||
			desiredWeight < 1 ||
			desiredWeight > 230
		) {
			sendError(errors.calc.weightRange);
			return;
		}

		if (currentWeight < desiredWeight) {
			sendError(errors.calc.onlyLosingWeight);
			return;
		}
	}

	next();
};

module.exports = checkBodyFornicknameAndPass;
