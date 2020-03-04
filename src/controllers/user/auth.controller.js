const User = require(`../../model/user.model`);
const errorsConfig = require(`../../config`).errors.auth;
// const bcrypt = require('bcrypt');

const auth = (req, res) => {
	const userFromReq = req.body;

	const sendLoginResponse = resp => {
		res.json({
			status: 'success',
			action: 'Log in',
			user: resp,
		});
	};

	const sendRegisterResponse = resp => {
		res.json({
			status: 'success',
			action: 'Registration',
			user: resp,
		});
	};

	const sendError = error => {
		res.status(400).json({
			status: 'error',
			err: error,
			message: error.message,
		});
	};

	User.findOne({ nickname: userFromReq.nickname }) // Ищем бзера в бд
		.then(userFromDB => {
			// Если юзера нет то регестрируем его
			if (!userFromDB) {
				const newUser = new User(userFromReq);
				newUser
					.save() // Токен и хеш пароля идет в схеме .pre
					.then(savedUser => {
						const { nickname, token, userData } = savedUser;
						const respData = {
							nickname,
							token,
							userData,
						};
						sendRegisterResponse(respData);
					})
					.catch(sendError);
				return; // Заканчиваем функцию!!! дальше код не будет отрабатывать!
			}
			// Если юзер есть то сравниваем хеш пароля
			userFromDB
				.comparePassword(userFromReq.password)
				.then(resp => {
					if (!resp) throw errorsConfig.passInvalid; // Если пароль не валид, кидаем ошибку
					userFromDB
						.createNewToken() // Добавляем новый токен
						.then(sendLoginResponse)
						.catch(sendError);
				})
				.catch(sendError);
		})
		.catch(sendError);
};
module.exports = auth;
