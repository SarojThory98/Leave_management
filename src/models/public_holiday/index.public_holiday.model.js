const mongoose = require("mongoose");
const {PUBLIC_HOLIDAY_KEYS} = require("../../constants/models/hr/publicHoliday.model.key");
const {COMMON_MODEL_KEYS} = require("../../constants/models/common/common.model.key");
const publicHolidaySchema = new mongoose.Schema(
	{
		[PUBLIC_HOLIDAY_KEYS.HOLIDAY_DATE]: {
			type: Date,
			trim: true,
			default: Date.now(),
		},
		[PUBLIC_HOLIDAY_KEYS.DESCRIPTION]: {
			type: String,
			trim: true,
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
	publicHoliday: mongoose.model("publicHoliday", publicHolidaySchema),
};
