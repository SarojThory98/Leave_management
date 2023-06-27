const response = require("../../../utils/api/api-response-handler.utils");
const {Public_Holiday} = require("../../../models/public_holiday/index.public_holiday.model");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const joiPublicHolidaySchema = require("../../../validation/app/hr/publicHoliday.validation");
const {PUBLIC_HOLIDAY_KEYS} = require("../../../constants/models/hr/publicHoliday.model.key");

const addPublicHoliday = async (req, res) => {
	try {
		// joi validation
		const result = joiPublicHolidaySchema.publicHolidayValidation.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		const {holiday_date, description} = req.body;

		// holiday_date validation
		const publicHolidayExist = await Public_Holiday.findOne({[PUBLIC_HOLIDAY_KEYS.HOLIDAY_DATE]: holiday_date});
		if (publicHolidayExist) {
			return response.error(res, API_MESSAGE.PUBLIC_HOLIDAY.HOLIDAY_ALREADY_EXIST);
		}

		// Create a new public holiday
		const newHolidayObj = {
			[PUBLIC_HOLIDAY_KEYS.HOLIDAY_DATE]: holiday_date,
			[PUBLIC_HOLIDAY_KEYS.DESCRIPTION]: description,
		};
		const newPublicHoliday = new Public_Holiday(newHolidayObj);

		// Save the user to the database
		await newPublicHoliday.save().then(() => {
			return response.success(res, API_MESSAGE.PUBLIC_HOLIDAY.ADD_HOLIDAY_SUCCESS);
		});
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	addPublicHoliday,
};
