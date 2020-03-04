const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductsSchema = new Schema(
	{
		title: {
			ua: {
				type: String,
			},
			ru: {
				type: String,
			},
		},
		calories: {
			type: Number,
		},
		categories: {
			type: Array,
		},
		weight: {
			type: Number,
			default: 100,
		},
		groupBloodNotAllowed: {
			type: Object,
			1: Boolean,
			2: Boolean,
			3: Boolean,
			4: Boolean,
		},
	},
	{
		timestamps: true,
	},
);

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
