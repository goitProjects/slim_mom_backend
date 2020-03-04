const Products = require(`../../model/products.model`);

const getProducts = (req, res) => {
	const { search } = req.query;
	const { user } = req;

	const sendResponse = products => {
		res.json({
			status: 'success',
			productsOptions: products,
		});
	};

	const sendError = (err, code) => {
		const status = code || 404;
		res.status(status).json({
			message: err.message,
			err,
		});
	};

	const formatRespAndCheckBlood = el => {
		let formatProduct = {
			value: el._id,
			label: el.title.ru,
			color: '#000',
		};
		if (user.userData) {
			const { groupBlood } = user.userData;
			formatProduct = {
				...formatProduct,
				color:
					el.groupBloodNotAllowed[String(groupBlood)] === true
						? '#c32323'
						: '#000',
			};
		}
		return formatProduct;
	};

	const searchFilter = search
		? { 'title.ru': { $regex: search, $options: 'i' } }
		: null;

	Products.find(searchFilter)
		// .sort({ 'title.ru': 1 })
		.lean()
		.then(products => {
			products.sort((a, b) => {
				const indexA = a.title.ru.toLowerCase().indexOf(search.toLowerCase());
				const indexB = b.title.ru.toLowerCase().indexOf(search.toLowerCase());
				if (indexA > indexB) {
					return 1;
				}
				if (indexA < indexB) {
					return -1;
				}
				return 0;
			});
			return products;
		})
		.then(products => products.map(formatRespAndCheckBlood))
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getProducts;
