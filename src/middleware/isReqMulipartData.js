const isReqMulipartData = (req, res, next) => {
	console.log(req.header);

	next();
};

module.exports = isReqMulipartData;
