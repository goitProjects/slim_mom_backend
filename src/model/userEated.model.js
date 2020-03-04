const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment-timezone');
const dateKiev = moment.tz(Date.now(), 'Europe/Kiev');

const UserEatedSchema = new Schema({
	title: {
		ua: {
			type: String,
		},
		ru: {
			type: String,
		},
	},
	basicCalories: {
		type: Number,
	},
	basicWeight: {
		type: Number,
		default: 100,
	},
	calories: {
		type: Number,
		default: 100,
	},
	weight: {
		type: Number,
	},
	groupBloodNotAllowed: {
		type: Object,
		1: Boolean,
		2: Boolean,
		3: Boolean,
		4: Boolean,
	},
	createdDate: {
		type: Date,
		default: dateKiev,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	dailyRate: { type: Number },
});

const UserEated = mongoose.model('UserEated', UserEatedSchema, 'eats');

module.exports = UserEated;
