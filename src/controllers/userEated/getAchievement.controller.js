const UserEated = require('../../model/userEated.model');
const setResp = require('../../utils/setRespForGraph');

const getAchevement = async (req, res) => {
	const userId = req.user._id;
	const dateFromReq = Date(req.params.date);

	const getDate = await new Date(dateFromReq).getDate();

	const dateToStartDay = new Date(
		new Date(new Date(dateFromReq).setHours(2, 59, 59, 999)).setDate(
			getDate + 1,
		),
	).toISOString();

	const dateToEndDay = new Date(
		new Date(new Date(dateFromReq).setHours(2, 59, 59, 999)).setDate(
			getDate - 30,
		),
	).toISOString();

	const sendResponse = products => {
		res.json({
			status: 'success',
			graphData: products,
		});
	};

	const sendError = err => {
		res.json({
			status: 'error',
			message: err.message,
		});
	};

	UserEated.find(
		{
			userId,
			createdDate: {
				$gte: await dateToEndDay,
				$lte: await dateToStartDay,
			},
		},
		{
			basicCalories: 0,
			basicWeight: 0,
			groupBloodNotAllowed: 0,
			userId: 0,
			__v: 0,
			title: 0,
			_id: 0,
			weight: 0,
		},
	)
		.then(data => {
			const resp = setResp(data, dateFromReq);
			sendResponse(resp);
		})
		.catch(sendError);
};

module.exports = getAchevement;
