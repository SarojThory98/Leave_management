const mongoose = require("mongoose");
const {LEAVE_BANK_KEYS} = require("../../constants/models/common/leaveBank.model.key");
const {COMMON_MODEL_KEYS} = require("../../constants/models/common/common.model.key");
const leaveBankSchema = new mongoose.Schema(
	{
		[COMMON_MODEL_KEYS.USER_ID]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		[LEAVE_BANK_KEYS.LEAVE_QUANTITY]: {
			type: Number,
			trim: true,
			default: 2,
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
	leaveBank: mongoose.model("leaveBank", leaveBankSchema),
};
