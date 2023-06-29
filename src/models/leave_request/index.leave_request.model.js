const mongoose = require("mongoose");
const {LEAVE_REQUEST_KEYS} = require("../../constants/models/common/leaveRequest.model.key");
const {LEAVE_REQUEST_STATUS_ENUM} = require("../../constants/models/Enums/leaveRequest.emuns");
const {COMMON_MODEL_KEYS} = require("../../constants/models/common/common.model.key");
const leaveRequestSchema = new mongoose.Schema(
	{
		[COMMON_MODEL_KEYS.USER_ID]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		[LEAVE_REQUEST_KEYS.START_DATE_TIME]: {
			type: Date,
			trim: true,
			default: Date.now(),
		},
		[LEAVE_REQUEST_KEYS.END_DATE_TIME]: {
			type: Date,
			trim: true,
			default: Date.now(),
		},
		[LEAVE_REQUEST_KEYS.COMMENT]: {
			type: String,
			trim: true,
		},
		[LEAVE_REQUEST_KEYS.STATUS]: {
			type: Number,
			trim: true,
			enum: Object.values(LEAVE_REQUEST_STATUS_ENUM),
			default: LEAVE_REQUEST_STATUS_ENUM.PENDING,
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
	leaveRequest: mongoose.model("leaveRequest", leaveRequestSchema),
};
