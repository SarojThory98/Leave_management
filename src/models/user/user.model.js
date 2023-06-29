const mongoose = require("mongoose");
const {USER_KEYS} = require("../../constants/models/employee/employee.model.key");
const {USER_TYPE_ENUM, EMPLOYEE_SIGNUP_STATUS} = require("../../constants/models/Enums/signUpEnums");
const {COMMON_MODEL_KEYS} = require("../../constants/models/common/common.model.key");
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
			enum: Object.values(USER_TYPE_ENUM),
			default: USER_TYPE_ENUM.EMPLOYEE,
		},
		[USER_KEYS.STATUS]: {
			type: Number,
			trim: true,
			enum: Object.values(EMPLOYEE_SIGNUP_STATUS),
			default: EMPLOYEE_SIGNUP_STATUS.PENDING,
		},
		[COMMON_MODEL_KEYS.CREATED_BY]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: "default-user",
		},
	},
	{timestamps: true},
);
module.exports = {
	user: mongoose.model("user", userSchema),
};
