const mongoose = require("mongoose");
const {PUBLIC_HOLIDAY_KEYS} = require("../../constants/models/hr/publicHoliday.model.key");
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
		[PUBLIC_HOLIDAY_KEYS.CREATED_BY]: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: "default-user",
		},
	},
	{timestamps: true},
);
module.exports = {
	Public_Holiday: mongoose.model("Public_Holiday", publicHolidaySchema),
};
