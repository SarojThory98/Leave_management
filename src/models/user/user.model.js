const mongoose = require("mongoose");
const {USER_KEYS} = require("../../constants/models/employee/employee.model.key");
const {USER_TYPE_ENUM} = require("../../constants/models/Enums/signUpEnums");
const userSchema = new mongoose.Schema(
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
			enum: [USER_TYPE_ENUM.MANAGEMENT, USER_TYPE_ENUM.HR, USER_TYPE_ENUM.EMPLOYEE],
			default: USER_TYPE_ENUM.EMPLOYEE,
		},
		[USER_KEYS.CREATED_BY]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: "default-user",
		},
	},
	{timestamps: true},
);
module.exports = {
	User: mongoose.model("User", userSchema),
};