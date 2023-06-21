const mongoose = require("mongoose");
const { USER_KEYS } = require("../../constants/models/user");
const empSchema = new mongoose.Schema(
	{
		[USER_KEYS.NAME]: {
			type: String,
			trim: true,
		},
		[USER_KEYS.EMAIL]: {
			type: String,
			trim: true,
		},
		[USER_KEYS.PASSWORD]: {
			type: String,
			trim: true,
		},
		[USER_KEYS.TYPE]: {
			type: Number,
			trim: true,
			enum: [0, 1, 2],
		},
		[USER_KEYS.CREATED_BY]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: "default-user",
		}
	},
	{ timestamps: true }
);
module.exports = {
	User: mongoose.model("User", empSchema)
};
