const Quotes = require(`../../model/quotes.model`);

const getQuotes = (req, res) => {
	const sendResponse = quotes => {
		res.json({
			status: 'success',
			quotes,
		});
	};

	const sendError = (err, code) => {
		const status = code || 404;
		res.status(status).json({
			message: err.message,
			err,
		});
	};

	Quotes.find(
		{},
		{
			_id: 0,
			createdAt: 0,
			updatedAt: 0,
			userId: 0,
			__v: 0,
		},
	)
		.then(quotes => {
			quotes.sort(() => Math.random() - 0.5);
			return quotes[0];
		})
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getQuotes;
