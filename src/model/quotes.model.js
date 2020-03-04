const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuotesSchema = new Schema(
	{
		title: {
			ua: {
				type: String,
			},
			ru: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	},
);

const Quotes = mongoose.model('Quotes', QuotesSchema);

module.exports = Quotes;
