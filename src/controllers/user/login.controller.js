const User = require('../../model/user.model');

const errors = require(`../../config`).errors.auth;

const login = (req, res) => {
	const user = req.body;
	const sendResponse = data => {
		res.json({
			status: 'success',
			user: data,
		});
	};

	const sendError = error => {
		let errMessage = 'login sendError must be update with this case';

		if (error) {
			errMessage = error;
		}
		res.status(400).json({
			err: errMessage,
		});
	};

	const nicknameReq = user.nickname.trim().toLowerCase(); // Тримим и ловеркейсим userName
	const userPasswordReq = user.password.trim(); // Тримим и пароль
	// console.log({ userPasswordReq });

	const findUser = User.findOne({ nickname: nicknameReq });

	findUser
		.then(userFromDB => {
			// console.log(userFromDB);
			if (!userFromDB) {
				throw errors.userExist; // Если юзер не найдет, кидаем ошибку
			}
			userFromDB
				.comparePassword(userPasswordReq) // сравниваем пароли
				.then(isPassValid => {
					if (!isPassValid) throw errors.passInvalid; // Если пароль не валид, кидаем ошибку
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
		})
		.catch(sendError);
};

module.exports = login;
