const setResp = (products, dateFromReq) => {
	const resp = {
		labels: [],
		eatedProducts: [],
		dailyRate: [],
	};

	for (let i = 0; i < 30; i += 1) {
		const startDay = new Date(dateFromReq).getDate();
		const date = new Date(dateFromReq).setDate(startDay - i);
		const newDate = new Date(date).toLocaleDateString('en-US', {
			day: '2-digit',
		});

		resp.labels.push(newDate);
		resp.eatedProducts.push(0);
		resp.dailyRate.push(0);
	}

	resp.labels = resp.labels.reverse();
	for (let i = 0; i < products.length; i += 1) {
		const prodDate = new Date(
			products[i].createdDate.setHours(3, 0, 0, 0),
		).toLocaleDateString('en-US', {
			day: '2-digit',
		});

		const labelIndex = resp.labels.indexOf(prodDate);
		resp.eatedProducts[labelIndex] += products[i].calories;

		if (products[i].dailyRate) {
			resp.dailyRate[labelIndex] = products[i].dailyRate;
		}
	}

	for (let i = 0; i < 30; i += 1) {
		if (resp.dailyRate[i] === 0) {
			for (let k = 1; k < 30; k += 1) {
				if (resp.dailyRate[i - k] !== 0) {
					if (resp.dailyRate[i] === 0) {
						resp.dailyRate[i] = resp.dailyRate[i - k];
					}
				}
			}
		}
	}

	for (let i = 0; i < 30; i += 1) {
		if (resp.eatedProducts[i] === 0 && !resp.dailyRate[i]) {
			resp.eatedProducts[i] = null;
		}
	}

	return resp;
};

module.exports = setResp;
