const path = require('path');

const fs = require(`fs`);
const excelToJson = require('convert-excel-to-json');

const Quotes = require(`../../model/quotes.model`);

const createQuotes = (req, res) => {
	const sheetName = `Лист1`;

	const productsFilePath = path.join(
		__dirname,
		'../../../uploads',
		req.file.filename,
	); // Путь к сохраненному файлу

	const sendResponse = data => {
		res.json({
			status: `success`,
			updatedData: data,
		});
	};

	const sendError = err => {
		res.status(400).json({
			err,
			message: err.message,
		});
	};

	const result = excelToJson({
		sourceFile: productsFilePath,
		header: {
			rows: 1,
		},
		sheets: [sheetName],
	});

	const getFiledArray = result[sheetName].map(product => ({
		title: {
			ru: product.A,
			ua: product.B,
		},
	}));

	console.log({ getFiledArray });

	Quotes.insertMany(getFiledArray, {
		bypassDocumentValidation: true,
		ordered: false,
		rawResult: false,
	})
		.then(data => {
			sendResponse(data);
		})
		.then(() => {
			// eslint-disable-next-line node/prefer-promises/fs
			fs.unlink(productsFilePath, err => {
				if (err) {
					console.error(err);
					// throw err
				}
				console.log(`${productsFilePath} was deleted`);
			});
		})
		.catch(err => {
			sendError(err);
		});
};

module.exports = createQuotes;
