const Joi = require("joi");
const {PUBLIC_HOLIDAY_KEYS} = require("../../../constants/models/hr/publicHoliday.model.key");

//  joi schema
const publicHolidayValidation = Joi.object().keys({
	[PUBLIC_HOLIDAY_KEYS.HOLIDAY_DATE]: Joi.date().iso().required(),
	[PUBLIC_HOLIDAY_KEYS.DESCRIPTION]: Joi.string().min(3).required(),
});

module.exports = {
	publicHolidayValidation,
};
