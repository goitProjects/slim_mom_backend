const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { secret, tokenLifeTime } = require(`../config`);

const SECRET_KEY = process.env.SECRET_KEY_FOR_JWT || secret;

const UserSchema = new Schema(
	{
		nickname: {
			type: String,
			index: true,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
			minlength: 5,
			maxlength: 16,
			validate: {
				validator(v) {
					return /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,16}$/g.test(v);
				},
			},
		},
		password: {
			type: String,
			required: true,
		},
		userData: {
			type: Object,
			email: {
				type: String,
				lowercase: true,
				trim: true,
				index: true,
				unique: true,
			},
			age: {
				type: Number,
				min: 1,
				max: 99,
				maxlength: 2,
			},
			desiredWeight: {
				type: Number,
				min: 1,
				max: 199,
				maxlength: 3,
			},
			height: {
				type: Number,
				min: 1,
				max: 230,
			},
			currentWeight: {
				type: Number,
				min: 1,
				max: 199,
				maxlength: 3,
			},
			groupBlood: {
				type: Number,
				enum: [1, 2, 3, 4],
			},
			dailyRate: {
				type: Number,
			},
		},
		token: { type: String },
		eatsRecorded: [
			{
				type: Schema.Types.ObjectId,
				ref: 'UserEated',
			},
		],
	},
	{
		timestamps: true,
	},
);

UserSchema.pre('findOneAndUpdate', function updateVersion() {
	const update = this.getUpdate();
	if (update.__v != null) {
		delete update.__v;
	}
	const keys = ['$set', '$setOnInsert'];
	// eslint-disable-next-line no-restricted-syntax
	for (const key of keys) {
		if (update[key] != null && update[key].__v != null) {
			delete update[key].__v;
			if (Object.keys(update[key]).length === 0) {
				delete update[key];
			}
		}
	}
	update.$inc = update.$inc || {};
	update.$inc.__v = 1;
});

UserSchema.pre('save', function() {
	this.hashPassword();
	// this.createNewToken();
});

UserSchema.methods.comparePassword = function comparePassword(pass) {
	return bcrypt.compare(pass, this.password);
};

UserSchema.methods.createNewToken = async function createNewToken() {
	const userId = this._id;
	const token = await jwt.sign(
		{ userId, createdDate: Date.now() },
		SECRET_KEY,
		{
			expiresIn: tokenLifeTime,
			noTimestamp: true,
		},
	);
	this.token = token;
	// console.log(this);
	await this.save(err => {
		console.log(err);
	});
	try {
		return this.token;
	} catch {
		return `something goes wrong on createNewToken User Method;(`;
	}
};

UserSchema.methods.hashPassword = async function hashPassword() {
	const hashedPassword = await bcrypt.hashSync(this.password.trim(), 10);
	this.password = await hashedPassword;

	try {
		return {
			password: this.password,
		};
	} catch {
		return `something goes wrong on hashPassword User Method ;(`;
	}
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
