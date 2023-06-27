const {Types} = require("mongoose");
const response = require("../../../utils/api/api-response-handler.utils");
const joiPublicHolidaySchema = require("../../../validation/app/hr/publicHoliday.validation");
const {Public_Holiday} = require("../../../models/public_holiday/index.public_holiday.model");
const {PUBLIC_HOLIDAY_KEYS} = require("../../../constants/models/hr/publicHoliday.model.key");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");

const updatePublicHoliday = async (req, res) => {
	try {
		const {holiday_date, description} = req.body;
		const _id = req.params.id;

		// Joi validation
		const result = joiPublicHolidaySchema.publicHolidayValidation.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		const updatedHoliday = await Public_Holiday.findOneAndUpdate(
			{[PUBLIC_HOLIDAY_KEYS.ID]: new Types.ObjectId(_id)},
			{
				[PUBLIC_HOLIDAY_KEYS.HOLIDAY_DATE]: holiday_date,
				[PUBLIC_HOLIDAY_KEYS.DESCRIPTION]: description,
			},
			{new: true},
		);

		if (!updatedHoliday) {
			return response.error(res, API_MESSAGE.PUBLIC_HOLIDAY.UPDATE_ERROR);
		}

		return response.success(res, API_MESSAGE.PUBLIC_HOLIDAY.UPDATE_ERROR);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	updatePublicHoliday,
};
