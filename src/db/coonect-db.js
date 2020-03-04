const mongoose = require('mongoose');

const connectToDB = dbUrl => {
	mongoose
		.connect(dbUrl, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log('Database connection successful');
		})
		.catch(err => {
			console.error('Database connection error: ', err);
		});
};

module.exports = connectToDB;
