const login = require(`./login.controller`);
const register = require('./register.controller');
const logout = require('./logout');

const auth = require(`./auth.controller`);
const getUser = require(`./get-user`);
const updateUser = require(`./update-user`);

module.exports = {
	auth,
	login,
	register,
	logout,
	updateUser,
	getUser,
};
