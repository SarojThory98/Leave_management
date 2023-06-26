const mongoose = require("mongoose");
const {LEAVE_REQUEST_KEYS} = require("../../constants/models/common/leaveRequest.model.key");
const {LEAVE_REQUEST_STATUS_ENUM} = require("../../constants/models/Enums/leaveRequest.emuns");
const leaveRequestSchema = new mongoose.Schema(
	{
		[LEAVE_REQUEST_KEYS.USER_ID]: {
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
			enum: [LEAVE_REQUEST_STATUS_ENUM.PENDING, LEAVE_REQUEST_STATUS_ENUM.APPROVE, LEAVE_REQUEST_STATUS_ENUM.REJECT],
			default: LEAVE_REQUEST_STATUS_ENUM.PENDING,
		},
		[LEAVE_REQUEST_KEYS.CREATED_BY]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: "default-user",
		},
	},
	{timestamps: true},
);
module.exports = {
	Leave_Request: mongoose.model("Leave_Request", leaveRequestSchema),
};
