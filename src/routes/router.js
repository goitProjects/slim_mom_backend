const express = require('express');
const {
	checkBodyForUserNameAndPass,
	addFileToReq,
	authCheck,
	// checkCalcReq,
	checkCreateNewEated,
} = require(`../middleware`);
const router = express.Router();
const {
	login,
	register,
	logout,
	updateUser,
	getUser,
	// auth,
} = require('../controllers/user');
// const calculator = require(`../controllers/calculator.controller`);
const { createQuotes, getQuotes } = require(`../controllers/quotes`);
const { createProducts, getProducts } = require('../controllers/products');
const {
	createUserEated,
	deleteUserEated,
	getUserEated,
	getAchevement,
} = require('../controllers/userEated');

const noSuchPageHandler = (req, res) => {
	res.status(404).json({
		status: 'error',
		message: 'No such route',
	});
};

router
	.get('/', (req, res) => {
		res.end('Basic api response');
	})

	// PUBLIC
	// роут для юзера
	// .post(`/auth`, checkBodyForUserNameAndPass, auth)
	.post('/login', checkBodyForUserNameAndPass, login)
	.post('/register', checkBodyForUserNameAndPass, register)

	// PRIVATE
	.use(authCheck)
	.put('/user', updateUser)
	.get('/user', getUser)

	// роут для калькулятора
	// .post('/calc', checkCalcReq, calculator)

	// роут Продуктов
	.post('/products/file', addFileToReq, createProducts) // Добавить продукты в дб
	.get('/products', getProducts) // Получить все продукты из дб
	// .put('/update-products', null)
	// .get('/products', null)
	// .delete('/delete-all-products', null)
	// .delete('/delete-one-products', null)

	// Роут для сьеденого
	.post(
		'/user/eats/:productId',
		authCheck,
		checkCreateNewEated,
		createUserEated,
	) // ? Записати що юзер з'їв і вернути новий документ
	.delete('/user/eats/:productId', deleteUserEated) //! Видалити що юзер з'їв - видалити документ по ід
	.get('/user/eats/:date', getUserEated) // Получить продукты юзера за определенный день
	.get('/user/eats/achievement/:date', getAchevement) // Получить продукты юзера за определенный день

	// Роут для цитат
	.post('/quotes', authCheck, addFileToReq, createQuotes)
	.get('/quotes', authCheck, getQuotes)

	// Logout
	.post('/logout', logout)
	// если нет пути шлем ошибку
	.all('*', noSuchPageHandler);
// .post('*', noSuchPageHandler);

module.exports = router;
