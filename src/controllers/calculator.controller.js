const calculator = (req, res) => {
	const { height, currentWeight, age, desiredWeight, groupBlood } = req.body;
	const callPerDay =
		10 * currentWeight +
		6.25 * height -
		5 * age -
		161 -
		10 * (currentWeight - desiredWeight);

	// find in collection list of categories not Allowed for this geoupBlood
	console.log(groupBlood);

	res.json({ status: 'success', calloriesPerDay: callPerDay });
};

module.exports = calculator;
