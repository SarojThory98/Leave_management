const mongoose = require("mongoose");
const {LEAVE_BANK_KEYS} = require("../../constants/models/common/leaveBank.model.key");
const leaveBankSchema = new mongoose.Schema(
	{
		[LEAVE_BANK_KEYS.USER_ID]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		[LEAVE_BANK_KEYS.LEAVE_QUANTITY]: {
			type: Number,
			trim: true,
			default: 2,
		},
		[LEAVE_BANK_KEYS.CREATED_BY]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: "default-user",
		},
	},
	{timestamps: true},
);
module.exports = {
	Leave_Bank: mongoose.model("Leave_Bank", leaveBankSchema),
};
